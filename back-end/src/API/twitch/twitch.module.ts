import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitchController } from './twitch.controller'
import {TwitchService} from "./twitch.service";
import {SpotifyService} from "../spotify/spotify.service";
import {UsersModule} from "../../users/users.module";


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
  ],
  controllers: [TwitchController],
  providers: [TwitchService],
  exports: [TwitchService],

})
export class TwitchModule {}