import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {stringify} from "querystring";
import axios from "axios";
import * as process from "node:process";
import {UsersService} from "../../users/users.service";
import {ExtractJwt} from "passport-jwt";
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

@Injectable()
export class TwitchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}
  generateAuthUrl(userId: string): string {
    const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
    const clientId = process.env.TWITCH_CLIENT_ID;
    const redirectUri = process.env.TWITCH_REDIRECT_URI || 'http://localhost:3000/twitch/callback';
    const scopes = 'user:read:email user:write:chat';

    const queryParams = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
      state: state,
    };

    const queryString = stringify(queryParams);

    return `https://id.twitch.tv/oauth2/authorize?${queryString}`;
  }

  async getTwitchAccessToken(code: string): Promise<any> {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const redirectUri = process.env.TWITCH_REDIRECT_URI || 'http://localhost:3000/twitch/callback';

    const url = 'https://id.twitch.tv/oauth2/token';

    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    };

    try {
      const response = await axios.post(url, null, { params });

      const { access_token, refresh_token, expires_in } = response.data;
      return { accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in };
    } catch (error) {
      throw new Error(`Failed to get Twitch access token: ${error.message}`);
    }
  }

  async checkTwitchStreamerLive(twitchToken: string, streamName: string): Promise<boolean> {
    console.log(`Checking if ${streamName} is live on Twitch`);
    const clientId = process.env.TWITCH_CLIENT_ID;
    try {
      const url = `https://api.twitch.tv/helix/search/channels?query=${encodeURIComponent(streamName)}`;

      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${twitchToken}`
      };

      const response = await axios.get(url, { headers });
      const streamData = response.data.data;

      const streamer = streamData.find((channel: any) => channel.display_name.toLowerCase() === streamName.toLowerCase());
      return streamer ? streamer.is_live : false;
    } catch (err) {
      console.error(`Error checking Twitch live status for ${streamName}:`, err);
      return false;
    }
  }

  async checkTwitchNasaViewerCount(twitchToken: string): Promise<boolean> {
    console.log('Check if nasa has more than 5000 viewers');
    const nasaTwitchId = "151920918"
    const clientId : string = process.env.TWITCH_CLIENT_ID;
    try {
      const url = `https://api.twitch.tv/helix/streams?user_id=${nasaTwitchId}`;

      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${twitchToken}`
      };

      const response = await axios.get(url, { headers });
      const streamData = response.data.data;

      if (streamData.length > 5000) {
        return true;
      } else {
       return false;
      }
    } catch (error) {
      return false;
    }
  }

  async getMyTwitchId(twitchToken: string){
    const clientId = process.env.TWITCH_CLIENT_ID;

    try {
      const url = "https://api.twitch.tv/helix/users"
      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${twitchToken}`
      };
      const response = await axios.get(url, { headers })
      return response.data.data[0].id
    } catch (error) {
      throw new Error(`Failed to getMyTwitchId: ${error.message}`);
    }
  }

  async isStreamerLive(streamName: string, twitchToken: string): Promise<string | null> {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const url = `https://api.twitch.tv/helix/search/channels?query=${encodeURIComponent(streamName)}`;

    const headers = {
      'Client-ID': clientId,
      'Authorization': `Bearer ${twitchToken}`
    };

    const response = await axios.get(url, { headers });
    const streamData = response.data.data;

    const streamer = streamData.find((channel: any) =>
        channel.display_name.toLowerCase() === streamName.toLowerCase() && channel.is_live
    );

    return streamer ? streamer.id : null;
  }


  async sendTwitchMessage(streamerName: string, twitchToken: string, message: string): Promise<any> {
    const clientId = process.env.TWITCH_CLIENT_ID;

    try {
      console.log(`Send ${message} to ${streamerName}`);
      const url = "https://api.twitch.tv/helix/chat/messages";
      const streamerId = await this.isStreamerLive(streamerName, twitchToken);
      if (!streamerId) {
        return;
      }
      const senderId = await this.getMyTwitchId(twitchToken);

      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${twitchToken}`,
        'Content-Type': 'application/json'
      };

      const body = {
        'broadcaster_id': streamerId,
        'sender_id': senderId,
        'message': message
      };

      const response = await axios.post(url, body, { headers });

      return response.data;
    } catch (error) {
      console.error(`Failed to sendTwitchMessage: ${error.message}`);
    }
  }

  async refreshTwitchToken(userId: string): Promise<void> {
    const data = await this.usersService.getElemApiToken(userId, 'Twitch');
    if (!data) {
      return;
    }
    const { refreshToken, expiresAt } = data;
    const isTokenExpired = new Date() >= new Date(expiresAt);

    if (!isTokenExpired) {
      return;
    }

    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('TWITCH_CLIENT_SECRET');
    const refreshTokenUrl = 'https://id.twitch.tv/oauth2/token';

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

      const { access_token, expires_in} = response.data;

      await this.usersService.saveToken('Twitch', access_token, refreshToken, expires_in, userId);
    } catch (error) {
      console.error('Error refreshing Twitch token:', error);
      throw new Error('Failed to refresh Twitch token');
    }
  }
}