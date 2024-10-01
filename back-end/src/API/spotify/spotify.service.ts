import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { stringify } from 'querystring';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getSpotifyAuthUrl(): string {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI');
    const scopes = this.configService.get<string>('SPOTIFY_SCOPES', 'user-read-private user-read-email');

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
      const response = await lastValueFrom(this.httpService.post(tokenUrl, stringify(body), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }));

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed to get Spotify access token: ${error.message}`);
    }
  }
}
