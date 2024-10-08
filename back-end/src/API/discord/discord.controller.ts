import {Controller, Get, Query, Res, UseGuards} from '@nestjs/common';
import {FastifyReply} from 'fastify';
import {DiscordService} from './discord.service';
import * as process from "node:process";
import {ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

@Controller('discord')
@ApiTags('Discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get Discord authentication URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the Discord authentication URL.', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('auth-url')
  discordLogin(): String {
    const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
    return `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify+email+guilds`;
  }

  @ApiOperation({ summary: 'Handle Discord callback and retrieve access token' })
  @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from Discord' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('callback')
  async discordLoginRedirect(@Query('code') code: string, @Res() reply: FastifyReply): Promise<void> {
    try {
      const accessToken = await this.discordService.getAccessToken(code);

      reply.send({ message: 'Discord login successful', accessToken});
    } catch (error) {
      console.error('Error during Discord login redirect:', error);
      reply.status(500).send({ message: 'Error logging in with Discord' });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('invite')
  @ApiOperation({ summary: 'Generate Discord bot invite URL' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of the Discord bot invite URL.', type: String })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  discordInvite(): String {
    const clientId = process.env.DISCORD_CLIENT_ID;
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot`;
  }
}
