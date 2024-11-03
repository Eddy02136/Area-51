import {Controller, Delete, Get, Headers, Patch, Query, Res, Response, UseGuards} from '@nestjs/common';
import {FastifyReply} from 'fastify';
import {DiscordService} from './discord.service';
import * as process from "node:process";
import {ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "../../users/users.service";
import * as jwt from "jsonwebtoken";

@Controller('discord')
@ApiTags('Discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService,
              private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get discord authentication URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the discord authentication URL.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('auth-url')
  getAuthUrl(@Headers('authorization') authorization: string, @Response() reply: FastifyReply){
    const jwtToken = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const userId = (decoded as { sub: string }).sub;
      const authUrl = this.discordService.getDiscordAuthUrl(userId);
      return reply.send({ url: authUrl});
    } catch (error) {
      reply.status(401).send('Invalid or expired token');
    }
  }

  @ApiOperation({ summary: 'Handle discord callback and retrieve access token' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from discord' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('callback')
  async handleDiscordCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply): Promise<void> {
    if (!code || !state) {
      return reply.status(400).send('Authorization code and state are required');
    }

    try {
      const { accessToken, refreshToken, expiresIn } = await this.discordService.getDiscordAccessToken(code);
      const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
      await this.usersService.saveToken('Discord', accessToken, refreshToken, expiresIn, userId);
      const frontendUrl = `http://localhost:3001/`;
      return reply.redirect(302, frontendUrl);
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Check discord connection' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'User is connected to discord', schema: { example: 'Connected'}})
  @ApiResponse({ status: 201, description: 'User is not connected to discord', schema: { example: 'Not connected'}})
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('check-connection')
  async checkConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const token = await this.usersService.getToken('Discord', userId);
    if (!token) {
      return reply.status(201).send('Not connected');
    }
    return reply.status(200).send('Connected');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout discord connection'})
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Discord logout successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @Delete('logout')
  async logoutConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    const result = await this.usersService.removeToken('Discord', userId);
    if (result === "") {
      return reply.status(200).send('Discord logout successfully.');
    }
    return reply.status(401).send(result);
  }

}
