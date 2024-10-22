import {Controller, Get, Headers, Query, Response, UseGuards} from "@nestjs/common";
import { TwitchService } from "./twitch.service";
import { AuthGuard } from "@nestjs/passport";
import { FastifyReply } from "fastify";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import {UsersService} from "../../users/users.service";

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
      reply.send({ authUrl });
    } catch (error) {
      reply.status(401).send('Invalid or expired token');
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
      return reply.status(200).send({'connected': false});
    }
    return reply.status(200).send({'connected': true});
  }

  }
