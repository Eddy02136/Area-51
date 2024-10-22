// src/API/discord/discord.module.ts

import { Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../../users/users.module";
import {SpotifyController} from "../spotify/spotify.controller";
import {SpotifyService} from "../spotify/spotify.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    UsersModule,
  ],
  controllers: [DiscordController],
  providers: [DiscordService],
  exports: [DiscordService],
})

export class DiscordModule {}
