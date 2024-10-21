import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {stringify} from "querystring";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService {
  constructor(
      private readonly configService: ConfigService,
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
    return `https://discord.com/api/oauth2/authorize?${queryString}`;
  }

  async getDiscordAccessToken(code: string) {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('DISCORD_REDIRECT_URI');
    try {
      const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
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

  async getUser(accessToken: string): Promise<any> {
    const response = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }
}
