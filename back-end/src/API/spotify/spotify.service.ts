import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { stringify } from 'querystring';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  getSpotifyAuthUrl(): string {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI');
    const scopes = 'user-read-playback-state user-modify-playback-state playlist-read-private user-read-email';

    const queryParams = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
    };

    const queryString = stringify(queryParams);
    return `https://accounts.spotify.com/authorize?${queryString}`;
  }

  async getSpotifyAccessToken(code: string): Promise<string> {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI');

    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const body = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    };

    try {
      const response = await axios.post(tokenUrl, stringify(body), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get Spotify access token: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async playMusic(accessToken: string, trackId: string): Promise<string> {
    const playUrl = 'https://api.spotify.com/v1/me/player/play';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const body = {
      uris: [`spotify:track:${trackId}`],
    };

    try {
      await axios.put(playUrl, body, { headers });
      return 'Track started playing successfully!';
    } catch (error) {
      throw new Error(`Failed to play track: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}
