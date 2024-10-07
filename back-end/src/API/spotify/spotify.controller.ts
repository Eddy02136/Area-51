import { Body, Controller, Get, Put, Query, Response, Headers, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { FastifyReply } from 'fastify';
import { AuthGuard } from '@nestjs/passport';


@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @UseGuards(AuthGuard('jwt'))
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

  @Put('play-music')
  async playTrack(
    @Headers('authorization') authorization: string,
    @Body() playDto: { trackId: string },
    @Response() reply: FastifyReply
  ) {
    if (!authorization) {
      return reply.status(400).send('Access token is required');
    }

    const accessToken = authorization.replace('Bearer ', '');

    if (!playDto.trackId) {
      return reply.status(400).send('Track ID is required');
    }

    try {
      const result = await this.spotifyService.playMusic(accessToken, playDto.trackId);
      return reply.send({ message: result });
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }
}
