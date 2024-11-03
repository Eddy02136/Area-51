import { Module } from "@nestjs/common";
import { SystemController } from "./system.controller";
import { SystemService } from "./system.service";
import { SpotifyModule } from "../API/spotify/spotify.module";
import { NasaModule } from "../API/nasa/nasa.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ActionReaction, ActionReactionSchema } from "../schema/ActionReaction.schema";
import {UsersModule} from "../users/users.module";
import {YoutubeModule} from "../API/youtube/youtube.module";
import {TwitchModule} from "../API/twitch/twitch.module";
import {GithubModule} from "../API/github/github.module";
import {DiscordModule} from "../API/discord/discord.module";

@Module({
  imports: [
    SpotifyModule,
    NasaModule,
    UsersModule,
    YoutubeModule,
    TwitchModule,
    GithubModule,
    DiscordModule,
    MongooseModule.forFeature([{ name: ActionReaction.name, schema: ActionReactionSchema }]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [MongooseModule],
})
export class SystemModule {}
