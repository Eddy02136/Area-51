import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import { SpotifyService } from "../API/spotify/spotify.service";
import { GithubService } from "../API/github/github.service";
import { NasaService } from "../API/nasa/nasa.service";
import { ActionReaction } from "../schema/ActionReaction.schema";
import { haversine } from "../utils/haversine";
import {UsersService} from "../users/users.service";
import {use} from "passport";
import {SpotifyController} from "../API/spotify/spotify.controller";
import {YoutubeService} from "../API/youtube/youtube.service";
import * as console from "node:console";
import {TwitchService} from "../API/twitch/twitch.service";

@Injectable()
export class SystemService implements OnModuleInit, OnModuleDestroy {
  private readonly actionIntervals: { [key: string]: number } = {
    'getIssPos': 120000,
    'newVideoSpaceX': 3600000,
    'getViewerNasa': 300000,
    'streamerInLive': 30000,
    'followingUserGithub': 300000,
    'changeUserGithub': 300000,
    'followersUserGithub': 300000,
  };

  private actionTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly nasaService: NasaService,
    private readonly userService: UsersService,
    private readonly youtubeService: YoutubeService,
    private readonly twitchService: TwitchService,
    private readonly githubService: GithubService,
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
      let token: string = ""
      switch (actionName) {
        case 'getIssPos':
          return await this.nasaService.getIssPosAction(ar);
        case 'newVideoSpaceX':
          await this.youtubeService.refreshYoutubeToken(ar.userId);
          token = await this.userService.getToken('Youtube', ar.userId);
          return await this.youtubeService.startCheckingForNewVideos(token);
        case 'getViewerNasa':
          await this.twitchService.refreshTwitchToken(ar.userId);
          token = await this.userService.getToken('Twitch', ar.userId);
          return await this.twitchService.checkTwitchNasaViewerCount(token);
        case 'streamerInLive':
          await this.twitchService.refreshTwitchToken(ar.userId);
          token = await this.userService.getToken('Twitch', ar.userId);
          const { streamerName } = ar.parameters;
          return await this.twitchService.checkTwitchStreamerLive(token, streamerName);
        case 'followingUserGithub':
          token = await this.userService.getToken('Github', ar.userId);
          return await this.githubService.checkNewFollowing(token)
        case 'changeUserGithub':
          token = await this.userService.getToken('Github', ar.userId);
          return await this.githubService.checkChangeGithubName(token);
        case 'followersUserGithub':
          token = await this.userService.getToken('Github', ar.userId);
          return await this.githubService.checkNewFollowers(token);
      }
    } catch (error) {
      console.error(`Error checking actions for ${actionName}:`, error);
      return false;
    }
  }

  async lunchReactions(ar: any): Promise<void> {
    const userId = ar.userId;
    let token: string = ""
    switch (ar.reactionName) {
      case 'playMusic':
        await this.spotifyService.refreshToken(userId);
        token = await this.userService.getToken('Spotify', userId);
        const { musicName } = ar.parameters;
        await this.spotifyService.playMusic(token, musicName);
        break;
      case 'postCommentary':
        await this.youtubeService.refreshYoutubeToken(userId);
        token = await this.userService.getToken('YouTube', userId);
        const { videoUrl: cVideoUrl, message: ytMessage } = ar.parameters;
        await this.youtubeService.postComment(token, cVideoUrl, ytMessage);
        break;
      case 'likeVideo':
        await  this.youtubeService.refreshYoutubeToken(userId);
        token = await this.userService.getToken('YouTube', userId);
        const { videoUrl: lVideoUrl } = ar.parameters;
        await this.youtubeService.likeVideo(token, lVideoUrl);
        break;
      case 'sendMessage':
        await this.twitchService.refreshTwitchToken(userId);
        token = await this.userService.getToken('Twitch', userId);
        const { streamerName, message: tMessage } = ar.parameters;
        await this.twitchService.sendTwitchMessage(streamerName, token, tMessage);
        break;
      case 'playPlaylist':
        await this.spotifyService.refreshToken(userId);
        token = await this.userService.getToken('Spotify', userId);
        const { playlistName } = ar.parameters;
        await this.spotifyService.playSpotifyPlaylist(token, playlistName);
        break;
      default:
        console.error(`Valeur inconnue pour reactionName: ${ar.reactionName}`);
    }
  }
}
