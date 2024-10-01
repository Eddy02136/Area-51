import { Controller, Get, Query, Response } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { FastifyReply } from 'fastify';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('auth-url')
  getAuthUrl(): string {
    return this.spotifyService.getSpotifyAuthUrl();
  }

  @Get('access-token')
  async getAccessToken(@Query('code') code: string): Promise<string> {
    if (!code) {
      throw new Error('Authorization code is required');
    }
    return this.spotifyService.getSpotifyAccessToken(code);
  }

  @Get('callback')
  async handleSpotifyCallback(@Query('code') code: string, @Response() reply: FastifyReply) {
    if (!code) {
      return reply.status(400).send('Authorization code is required');
    }

    try {
      const accessToken = await this.spotifyService.getSpotifyAccessToken(code);
      return reply.send({ accessToken });
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }
}
