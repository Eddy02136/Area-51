import {Controller, Delete, Get, Headers, Post, Query, Response, UseGuards} from "@nestjs/common";
import {TwitchService} from "./twitch.service";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import {UsersService} from "../../users/users.service";
import {ApiHeader, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService,
              private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
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

  @Get('callback')
  async handleTwitchCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply) {
    if (!code || !state) {
      return reply.status(400).send('Authorization code and state are required');
    }

    try {
      const { accessToken, refreshToken, expiresIn } = await this.twitchService.getTwitchAccessToken(code);
      const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
      await this.usersService.saveToken('Twitch', accessToken, refreshToken, expiresIn, userId);
      const frontendUrl = `http://localhost:3001/`;
      console.log(accessToken)
      return reply.redirect(302, frontendUrl);
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }

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
  @ApiOperation({ summary: 'Logout Twitch connection'})
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
