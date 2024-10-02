import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DiscordService {
  private readonly clientID = process.env.DISCORD_CLIENT_ID;
  private readonly clientSecret = process.env.DISCORD_CLIENT_SECRET;
  private readonly redirectUri = process.env.DISCORD_REDIRECT_URI;
  private readonly scopes: string[] = ['identify', 'email', 'dm_channels.messages.write', 'dm_channels.messages.read', 'guilds'];

  async getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: this.clientID,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,
        scope: this.scopes.join('+'),
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error.response?.status, error.response?.data || error.message);
      throw new Error('Failed to get access token');
    }
  }

  async getUser(accessToken: string): Promise<any> {
    const response = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }
}
