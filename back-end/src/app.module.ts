import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { NasaModule } from './API/nasa/nasa.module';
import { SpotifyModule } from './API/spotify/spotify.module'

import * as process from 'node:process';
import { DiscordModule } from './API/discord/discord.module';
import {HealthModule} from "./health/health.module";

dotenv.config();

console.log(process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    DiscordModule,
    NasaModule,
    SpotifyModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
