import { Body, Controller, Get, Put, Query, Response, Headers, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { FastifyReply } from 'fastify';
import { AuthGuard } from '@nestjs/passport';
import {ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";


@Controller('spotify')
@ApiTags('Spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get Spotify authentication URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the Spotify authentication URL.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('auth-url')
  getAuthUrl(): string {
    return this.spotifyService.getSpotifyAuthUrl();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get Spotify access token' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from Spotify' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('access-token')
  async getAccessToken(@Query('code') code: string): Promise<string> {
    if (!code) {
      throw new Error('Authorization code is required');
    }
    return this.spotifyService.getSpotifyAccessToken(code);
  }

  @ApiOperation({ summary: 'Handle Spotify callback and retrieve access token' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from Spotify' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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

  @ApiOperation({ summary: 'Play a track on Spotify' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Spotify API access' })
  @ApiBody({
    description: 'Track ID to be played',
    schema: {
      example: {
        trackId: '123456789'
      },
    }
  })
  @ApiResponse({ status: 200, description: 'Track is being played successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Access token or Track ID is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
