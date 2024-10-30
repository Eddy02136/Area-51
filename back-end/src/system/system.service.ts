import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import { SpotifyService } from "../API/spotify/spotify.service";
import { NasaService } from "../API/nasa/nasa.service";
import { ActionReaction } from "../schema/ActionReaction.schema";
import { haversine } from "../utils/haversine";
import {UsersService} from "../users/users.service";

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

  async handleActionReaction(userId : any): Promise<void> {
    const actionsReactions = await this.actionReactionModel.find({userId});

    for (const ar of actionsReactions) {
      if (ar.actionName === 'iss_get_pos') {
        const { iss_position: issPosition } = await this.nasaService.getIssPosition();
        const { city, trackId } = ar.parameters;

        if (this.CITY_COORDINATES[city]) {
          const { latitude, longitude } = this.CITY_COORDINATES[city];
          const distance = haversine(latitude, longitude, issPosition.latitude, issPosition.longitude);

          if (ar.reactionName === "spotify_play_music" && distance <= 2000) {
            const token = await this.userService.getToken('Spotify', userId);
            await this.spotifyService.playMusic(token, trackId);
          }
        }
      }
    }
  }
}
