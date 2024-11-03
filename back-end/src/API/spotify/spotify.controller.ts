import {Body, Controller, Get, Put, Query, Response, Headers, UseGuards, Delete} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { FastifyReply } from 'fastify';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import { UsersService } from "../../users/users.service";

@Controller('spotify')
@ApiTags('Spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService,
  private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get spotify authentication URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the spotify authentication URL.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('auth-url')
  getAuthUrl(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const userId = (decoded as { sub: string }).sub;
      const authUrl = this.spotifyService.getSpotifyAuthUrl(userId);
      return reply.send({ url: authUrl});
    } catch (error) {
      reply.status(401).send('Invalid or expired token');
    }
  }

  @ApiOperation({ summary: 'Handle spotify callback and retrieve access token' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from spotify' })
  @ApiResponse({ status: 200, description: 'Spotify login successful' })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('callback')
  async handleSpotifyCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply) {
    if (!code || !state) {
      return reply.status(400).send('Authorization code and state are required');
    }

    try {
      const { accessToken, refreshToken, expiresIn } = await this.spotifyService.getSpotifyAccessToken(code);
      const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
      await this.usersService.saveToken('Spotify', accessToken, refreshToken, expiresIn, userId);
      const frontendUrl = `http://localhost:8081/`;
      return reply.redirect(302, frontendUrl);
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Check spotify connection' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'User is connected to spotify', schema: { example: 'Connected'}})
  @ApiResponse({ status: 201, description: 'User is not connected to spotify', schema: { example: 'Not connected'}})
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('check-connection')
  async checkConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const token = await this.usersService.getToken('Spotify', userId);
    if (!token) {
      return reply.status(201).send('Not connected');
    }
    return reply.status(200).send('Connected');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout spotify connection'})
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Spotify logout successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @Delete('logout')
  async logoutConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const result = await this.usersService.removeToken('Spotify', userId);
    if (result === "") {
      return reply.status(200).send('Spotify logout successfully.');
    }
    return reply.status(401).send(result);
  }
}
