import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { stringify } from 'querystring';
import {UsersService} from "../../users/users.service";
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from "rxjs";

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  getSpotifyAuthUrl(userId: string): string {
    const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI');
    const scopes = 'user-read-playback-state user-modify-playback-state playlist-read-private user-read-email';

    const queryParams = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes,
      state: state,
    };

    const queryString = stringify(queryParams);
    return `https://accounts.spotify.com/authorize?${queryString}`;
  }

  async getSpotifyAccessToken(code: string) {
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

      const { access_token, refresh_token, expires_in } = response.data;
      return { accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in };
    } catch (error) {
      throw new Error(`Failed to get Spotify access token: ${error}`);
    }
  }

  async searchTrack(musicName: string, token: string): Promise<string | null> {
    const response = await lastValueFrom(
        this.httpService.get(`https://api.spotify.com/v1/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: musicName,
            type: 'track',
            limit: 1,
          },
        }),
    );

    const tracks = response.data.tracks.items;
    return tracks.length > 0 ? tracks[0].id : null;
  }

  async getUserPlaylists(accessToken: string) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: { limit: 100 }
      });

      return response.data.items;
    } catch (error) {
      console.error('Failed to retrieve user playlists:', error);
      return [];
    }
  }

  async getPlaylistUriByName(accessToken: string, playlistName: string) {
    const playlists = await this.getUserPlaylists(accessToken);
    const foundPlaylist = playlists.find(playlist => playlist.name.toLowerCase() === playlistName.toLowerCase());

    if (foundPlaylist) {
      return foundPlaylist.uri;
    } else {
      return null;
    }
  }

  async playMusic(accessToken: string, musicName: string): Promise<string> {
    console.log(`Play ${musicName} on spotify`);
    const trackId = await this.searchTrack(musicName, accessToken);
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
      console.error('Failed to play music:', error.message);
    }
  }

  async playSpotifyPlaylist(accessToken: string, playlistName: string) {
    try {
      console.log(`Play ${playlistName} on spotify`);
      const playlistUri = await this.getPlaylistUriByName(accessToken, playlistName);
      const playUrl = 'https://api.spotify.com/v1/me/player/play';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const body = {
        context_uri: playlistUri
      };
      const response = await axios.put(playUrl, body, { headers });
    } catch (error) {
      console.error('Failed to lunch playlist :', error.message);
    }
  }

  async setVolumeMax(accessToken: string) {
    try {
      console.log("Set volume max on Spotify");

      const res = await axios.put(
          "https://api.spotify.com/v1/me/player/volume",
          null,
          {
            params: { volume_percent: 100 },
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
      );

      console.log("Volume music set 100%");
    } catch (error) {
      console.error("Failed to set volume max :", error.response?.data || error.message);
    }
  }


  async refreshToken(userId: string) : Promise<void> {
    const data = await this.usersService.getElemApiToken(userId, 'Spotify');
    if (!data) {
      return;
    }
    const { refreshToken, expiresAt } = data
    const isTokenExpired = new Date() >= new Date(expiresAt);
    if (!isTokenExpired) {
      return;
    }
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    const refreshTokenUrl = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      const response = await axios.post(refreshTokenUrl, body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authHeader}`,
        },
      });

      const { access_token, expires_in } = response.data;
      await this.usersService.saveToken('Spotify', access_token, refreshToken, expires_in, userId);
    } catch (error) {
      console.error('Error refreshing Spotify token:', error.message);
    }
  }
}
