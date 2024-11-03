import {Controller, Delete, Get, Headers, Post, Query, Response, UseGuards} from "@nestjs/common";
import {TwitchService} from "./twitch.service";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import {UsersService} from "../../users/users.service";
import {ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('twitch')
@ApiTags('Twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService,
              private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get twitch authentication URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the twitch authentication URL.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('auth-url')
  async getAuthUrl(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const userId = (decoded as { sub: string }).sub;
      const authUrl = this.twitchService.generateAuthUrl(userId);
      reply.send({ url: authUrl });
    } catch (error) {
      reply.status(401).send(error.message);
    }
  }

  @ApiOperation({ summary: 'Handle twitch callback and retrieve access token' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from twitch' })
  @ApiResponse({ status: 200, description: 'Twitch login successful' })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('callback')
  async handleTwitchCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply) {
    if (!code || !state) {
      return reply.status(400).send('Authorization code and state are required');
    }

    try {
      const { accessToken, refreshToken, expiresIn } = await this.twitchService.getTwitchAccessToken(code);
      const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
      await this.usersService.saveToken('Twitch', accessToken, refreshToken, expiresIn, userId);
      const frontendUrl = `http://localhost:8081/`;
      console.log(accessToken)
      return reply.redirect(302, frontendUrl);
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Check twitch connection' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'User is connected to twitch', schema: { example: 'Connected'}})
  @ApiResponse({ status: 201, description: 'User is not connected to twitch', schema: { example: 'Not connected'}})
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('check-connection')
  async checkConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const token = await this.usersService.getToken('Twitch', userId);
    if (!token) {
      return reply.status(201).send('Not connected');
    }
    return reply.status(200).send('Connected');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout twitch connection'})
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Twitch logout successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @Delete('logout')
  async logoutConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const result = await this.usersService.removeToken('Twitch', userId);
    if (result === "") {
      return reply.status(200).send('Twitch logout successfully.');
    }
    return reply.status(401).send(result);
  }
}
