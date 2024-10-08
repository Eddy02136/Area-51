import { Module } from "@nestjs/common";
import { SystemController } from "./system.controller";
import { SystemService } from "./system.service";
import { SpotifyModule } from "../API/spotify/spotify.module";
import { NasaModule } from "../API/nasa/nasa.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ActionReaction, ActionReactionSchema } from "../schema/ActionReaction.schema";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    SpotifyModule,
    NasaModule,
    UsersModule,
    MongooseModule.forFeature([{ name: ActionReaction.name, schema: ActionReactionSchema }]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [MongooseModule],
})
export class SystemModule {}
