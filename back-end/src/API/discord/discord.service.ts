import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {stringify} from "querystring";
import { ConfigService } from '@nestjs/config';
import {UsersService} from "../../users/users.service";

@Injectable()
export class DiscordService {
  private lastGlobalName: Map<string, string> = new Map();
  private lastNumberServer: Map<string, number> = new Map();

  constructor(
      private readonly configService: ConfigService,
      private readonly usersService: UsersService
  ) {}

  private readonly scopes: string[] = ['identify', 'email', 'dm_channels.messages.write', 'dm_channels.messages.read', 'guilds'];

  getDiscordAuthUrl(userId: string): string {
    const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const redirectUri = this.configService.get<string>('DISCORD_REDIRECT_URI');
    const scopes = this.scopes;

    const queryParams = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
      state: state,
    };

    const queryString = stringify(queryParams);
    return `https://discord.com/api/v10/oauth2/authorize?${queryString}`;
  }

  async getDiscordAccessToken(code: string) {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('DISCORD_REDIRECT_URI');
    try {
      const response = await axios.post('https://discord.com/api/v10/oauth2/token', new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        scope: this.scopes.join('+'),
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { access_token, refresh_token, expires_in } = response.data;
      return { accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in };
    } catch (error) {
      throw new Error(`Failed to get Discord access token: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async checkUsernameDiscord(accessToken: string, actionId: string): Promise<boolean>
  {
    try {
      console.log('Check user has changed his discord username');
      const response = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const currentGlobalName =  response.data.global_name;
      if (currentGlobalName == null) {
        return false;
      }
      if (!this.lastGlobalName.has(actionId)) {
        this.lastGlobalName.set(actionId, currentGlobalName);
        return false;
      }
      if (currentGlobalName !== this.lastGlobalName.get(actionId)) {
        this.lastGlobalName.set(actionId, currentGlobalName);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to getUsername: ${error.message}`);
    }
  }

  async checkJoinOtherServerDiscord(accessToken: string, actionId: string): Promise<boolean> {
    try {
      console.log('Check user has joined server discord');
      const response = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      const currentNumberServer =  response.data.length;
      if (currentNumberServer == null) {
        return false;
      }
      if (!this.lastNumberServer.has(actionId)) {
        this.lastNumberServer.set(actionId, currentNumberServer);
        return false;
      }
      if (currentNumberServer !== this.lastNumberServer.get(actionId)) {
        this.lastNumberServer.set(actionId, currentNumberServer);
        return true;
      } else {
        return false;
      }
    }  catch (error) {
      throw new Error(`Failed to all serverDiscord: ${error.message}`);
    }
  }

  async refreshDiscordToken(userId: string): Promise<void> {
    const data = await this.usersService.getElemApiToken(userId, 'Discord');
    if (!data) {
      return;
    }
    const { refreshToken, expiresAt } = data;
    const isTokenExpired = new Date() >= new Date(expiresAt);

    if (!isTokenExpired) {
      return;
    }

    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');
    const refreshTokenUrl = 'https://discord.com/api/v10/oauth2/token';

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await axios.post(refreshTokenUrl, body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, expires_in, refresh_token } = response.data;
      await this.usersService.saveToken('Discord', access_token, refresh_token, expires_in, userId);
    } catch (error) {
      console.error('Error refreshing Discord token:', error);
      throw new Error('Failed to refresh Discord token');
    }
  }
}
