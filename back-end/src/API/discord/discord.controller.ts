import {Controller, Get, Query, Res} from '@nestjs/common';
import {FastifyReply} from 'fastify';
import {DiscordService} from './discord.service';
import * as process from "node:process";
import {ApiTags} from "@nestjs/swagger";

@Controller('discord')
@ApiTags('Discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('auth-url')
  discordLogin(): String {
    const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
    return `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify+email+guilds`;
  }

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

  @Get('invite')
  discordInvite(): String {
    const clientId = process.env.DISCORD_CLIENT_ID;
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot`;
  }
}
