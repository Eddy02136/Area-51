import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {stringify} from "querystring";
import { ConfigService } from '@nestjs/config';
import {UsersService} from "../../users/users.service";

@Injectable()
export class DiscordService {
  private lastGlobalName: string | null = null;
  private isCurrentNameInit: boolean = false
  private lastNumberServer: string | null = null;
  private isCurrentNumberServerInit: boolean = false;

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
      console.log(access_token)
      return { accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in };
    } catch (error) {
      throw new Error(`Failed to get Discord access token: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async getUser(accessToken: string): Promise<any> {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }

  async checkUsernameDiscord(accessToken: string): Promise<boolean>
  {
    try {
      const response = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const currentGlobalName =  response.data.global_name;
      if (!this.isCurrentNameInit) {
        this.lastGlobalName = currentGlobalName
        this.isCurrentNameInit = true
      }
      if (!currentGlobalName) return false;
      if (currentGlobalName !== this.lastGlobalName) {
        this.lastGlobalName = currentGlobalName;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Failed to getUsername: ${error.message}`);
    }
  }

  async checkJoinOtherServerDiscord(accessToken: string): Promise<boolean> {
    try {
      const response = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      const currentNumberServer =  response.data.length;
      if (!this.isCurrentNumberServerInit) {
        this.lastNumberServer = currentNumberServer
        this.isCurrentNumberServerInit = true
      }
      if (!currentNumberServer) return false;
      if (currentNumberServer !== this.lastNumberServer) {
        this.lastNumberServer = currentNumberServer;
        return true;
      } else {
        return false;
      }
    }  catch (error) {
      throw new Error(`Failed to all serverDiscord: ${error.message}`);
    }
  }

  async refreshDiscordToken(userId: string): Promise<void> {
    const { refreshToken, expiresAt } = await this.usersService.getElemApiToken(userId, 'Discord');
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
