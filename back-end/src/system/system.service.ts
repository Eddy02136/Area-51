import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import { SpotifyService } from "../API/spotify/spotify.service";
import { NasaService } from "../API/nasa/nasa.service";
import { ActionReaction } from "../schema/ActionReaction.schema";
import { haversine } from "../utils/haversine";
import {UsersService} from "../users/users.service";
import {use} from "passport";

@Injectable()
export class SystemService {
  private readonly CITY_COORDINATES: { [key: string]: { latitude: number; longitude: number } } = {
    'New-York': { latitude: 40.712784, longitude: -74.005941 },
    'Paris': { latitude: 48.856613, longitude: 2.352222 },
    'Londres': { latitude: 51.507351, longitude: -0.127758 },
    'Tokyo': { latitude: 35.682839, longitude: 139.759455 },
    'Toulouse': {latitude: 43.6045, longitude: 1.4442}
  };

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly nasaService: NasaService,
    private readonly userService: UsersService,
    @InjectModel(ActionReaction.name) private actionReactionModel: Model<ActionReaction>,
  ) {}

  async checkActions(ar: any) : Promise<boolean> {
    switch (ar.actionName) {
      case 'getIssPos':
        return await this.nasaService.getIssPosAction(ar);
    }
  }

  async lunchReaction(ar: any, userId: any) {
    switch (ar.reactionName) {
      case 'playMusic':
        const token = await this.userService.getToken('Spotify', userId)
        const { trackId } = ar.parameters;
        return await this.spotifyService.playMusic(token, trackId);
    }
  }

  async handleActionReaction(userId : any): Promise<void> {
    const actionsReactions = await this.actionReactionModel.find({userId});
    for (const ar of actionsReactions) {
      const check = await this.checkActions(ar);
      console.log(check);
      if (check) {
        await this.lunchReaction(ar, userId);
      }
    }
  }
}
