import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {stringify} from "querystring";
import axios from "axios";
import * as process from "node:process";

@Injectable()
export class TwitchService {
  constructor(
    private readonly configService: ConfigService,
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

  async checkTwitchNasaLive(nasaTwitchId: string, twitchToken: string): Promise<boolean> {
    const clientId = process.env.TWITCH_CLIENT_ID;
    try {
      const url = `https://api.twitch.tv/helix/streams?user_id=${nasaTwitchId}`;

      const headers = {
        'Client-ID': clientId,
        'Authorization': twitchToken
      };

      const response = await axios.get(url, { headers });
      const streamData = response.data.data;

      return streamData.length > 0 && streamData[0].type === 'live';
    } catch (err) {
      throw new Error(`Failed to checkNasaLive: ${err}`);
    }
  }

  async checkTwitchNasaViewerCount(nasaTwitchId: string, twitchToken: string) {
    const clientId : string = process.env.TWITCH_CLIENT_ID;
    try {
      const url = `https://api.twitch.tv/helix/streams?user_id=${nasaTwitchId}`;

      const headers = {
        'Client-ID': clientId,
        'Authorization': twitchToken
      };

      const response = await axios.get(url, { headers });
      const streamData = response.data.data;

      if (streamData.length > 0) {
        return streamData[0].viewer_count
      } else {
       return 0
      }
    } catch (err) {
      throw new Error(`Failed to checkNasaLive: ${err}`);
    }
  }

  async getMyTwitchid(twitchToken: string){
    const clientId = process.env.TWITCH_CLIENT_ID;

    try {
      const url = "https://api.twitch.tv/helix/users"
      const headers = {
        'Client-ID': clientId,
        'Authorization': twitchToken
      };
      const response = await axios.get(url, { headers })
      return response.data.data[0].id
    } catch (error) {
      throw new Error(`Failed to getMyTwitchId: ${error.message}`);
    }
  }

  async sendTwitchNasaMessage(nasaTwitchId: string, senderId: any, twitchToken: string): Promise<any> {
    const clientId = process.env.TWITCH_CLIENT_ID;

    try {
      const url = "https://api.twitch.tv/helix/chat/messages";

      const headers = {
        'Client-ID': clientId,
        'Authorization': twitchToken,
        'Content-Type': 'application/json'
      };

      const body = {
        'broadcaster_id': nasaTwitchId,
        'sender_id': senderId,
        'message': "🚀🚀🚀"
      };

      const response = await axios.post(url, body, { headers });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to sendMessageTwitch: ${error.message}`);
    }
  }
}