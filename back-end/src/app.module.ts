import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { NasaModule } from './API/nasa/nasa.module';
import { SpotifyModule } from './API/spotify/spotify.module'
import { DiscordModule } from './API/discord/discord.module';
import { HealthModule } from "./health/health.module";
import { SystemModule } from "./system/sytem.module";
import * as process from 'node:process';
import {ManageModule} from "./manage/manage.module";
import {YoutubeModule} from "./API/youtube/youtube.module";
import {TwitchModule} from "./API/twitch/twitch.module";
import {GithubModule} from "./API/github/github.module";
import {AboutModule} from "./about/about.module";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    UsersModule,
    DiscordModule,
    NasaModule,
    SpotifyModule,
    YoutubeModule,
    HealthModule,
    SystemModule,
    ManageModule,
    TwitchModule,
    GithubModule,
    AboutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
