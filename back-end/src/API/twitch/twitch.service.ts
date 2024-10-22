import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {stringify} from "querystring";
import axios from "axios";

@Injectable()
export class TwitchService {
  constructor(
    private readonly configService: ConfigService,
  ) {}
  generateAuthUrl(userId: string): string {
    const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
    const clientId = process.env.TWITCH_CLIENT_ID;
    const redirectUri = process.env.TWITCH_REDIRECT_URI || 'http://localhost:3000/twitch/callback';
    const scopes = 'user:read:email';

    const queryParams = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
      state: state,
    };

    const queryString = stringify(queryParams);

    return `https://id.twitch.tv/oauth2/authorize?${queryString}`;  }

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

  async checkNasaLive(nasaTwitchId: string, twitchToken: string): Promise<boolean> {
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
}