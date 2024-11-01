import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import { SpotifyService } from "../API/spotify/spotify.service";
import { NasaService } from "../API/nasa/nasa.service";
import { ActionReaction } from "../schema/ActionReaction.schema";
import { haversine } from "../utils/haversine";
import {UsersService} from "../users/users.service";
import {use} from "passport";
import {SpotifyController} from "../API/spotify/spotify.controller";
import {YoutubeService} from "../API/youtube/youtube.service";
import * as console from "node:console";

@Injectable()
export class SystemService implements OnModuleInit, OnModuleDestroy {
  private readonly actionIntervals: { [key: string]: number } = {
    'getIssPos': 120000,
    'newVideoSpaceX': 3600000,
  };

  private actionTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly nasaService: NasaService,
    private readonly userService: UsersService,
    private readonly youtubeService: YoutubeService,
    @InjectModel(ActionReaction.name) private actionReactionModel: Model<ActionReaction>,
  ) {}

  onModuleInit() {
    this.startToChecks();
  }

  onModuleDestroy() {
    this.actionTimers.forEach(timer => clearInterval(timer));
  }

  startToChecks(): void {
    Object.keys(this.actionIntervals).forEach(action => {
      const interval = this.actionIntervals[action];

      if (!this.actionTimers.has(action)) {
        this.actionTimers.set(action, setInterval(async () => {
          await this.handleActionsReactions(action);
        }, interval));
      }
    });
  }

  async handleActionsReactions(actionName: string) {
    const actionsReactions = await this.actionReactionModel.find({ actionName });
    for (const ar of actionsReactions) {
      const check = await this.checkActions(actionName, ar);
      if (check) {
        await this.lunchReactions(ar);
      }
    }
  }

  async checkActions(actionName: string, ar: any): Promise<boolean> {
    try {
      switch (actionName) {
        case 'getIssPos':
          return await this.nasaService.getIssPosAction(ar);
        case 'newVideoSpaceX':
          await this.youtubeService.refreshYoutubeToken(ar.userId);
          const token = await this.userService.getToken('Youtube', ar.userId);
          return await this.youtubeService.startCheckingForNewVideos(token);
      }
    } catch (error) {
      console.error(`Error checking actions for ${actionName}:`, error);
      return false;
    }
  }

  async lunchReactions(ar: any): Promise<void> {
    const userId = ar.userId;
    switch (ar.reactionName) {
      case 'playMusic':
        await this.spotifyService.refreshToken(userId);
        const token = await this.userService.getToken('Spotify', userId);
        const { trackId } = ar.parameters;
        await this.spotifyService.playMusic(token, trackId);
    }
  }
}
