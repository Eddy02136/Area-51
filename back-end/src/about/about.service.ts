import {Injectable} from "@nestjs/common";

@Injectable()
export class AboutService {
    constructor() {}

    about(request : any): any {
        return {
            client: {
                host: request.ip,
            },
            server: {
                current_time: Math.floor(Date.now() / 1000),
                services: [
                    {
                        name: 'discord',
                        actions: [{
                                name: "checkChangeUserNameDiscord",
                                description: "Check if username discord have changed"
                            }, {
                                name: "checkJoinOtherServerDiscord",
                                description: "Check when user join server discord"
                        }],
                        reactions: [
                        ],
                    },
                    {
                        name: 'spotify',
                        actions: [
                        ],
                        reactions: [{
                            name: "playMusic",
                            description: "Play music on Spotify"
                        }, {
                            name: "playPlaylist",
                            description: "Play playlist on Spotify"
                        }, {
                            name: "setVolumeMax",
                            description: "Sets current music volume to max"
                        }]
                    },
                    {
                        name: 'youtube',
                        actions: [{
                            name: "newVideoSpaceX",
                            description: "Check if SpaceX has posted a new video"
                        }],
                        reactions: [{
                            name: "postCommentary",
                            description: "A new commentary is posted on a video"
                        }, {
                            name: "likeVideo",
                            description: "Like video from your choice"
                        }]
                    },
                    {
                        name: 'github',
                        actions: [{
                            name: "followingUserGithub",
                            description: "Check if user follow new person",
                        }, {
                            name: "changeUserGithub",
                            description: "Check if username github have changed"
                        }, {
                            name: "followersUserGithub",
                            description: "Check if user is follow by a new person"
                        }],
                        reactions: []
                    },
                    {
                        name: 'twitch',
                        actions: [{
                            name: "getViewerNasa",
                            description: "Check if Nasa have more than 5000 viewers"
                        }, {
                            name: "streamerInLive",
                            description: "Get if a streamer is in live"
                        }],
                        reactions: [{
                            name: "sendMessage",
                            description: "Send a message in the stream chat"
                        }]
                    },
                    {
                        name: 'nasa',
                        actions: [{
                            name: "getIssPos",
                            description: "Gets the position of the iss"
                        }],
                        reactions: []
                    }
                ],
            },
        };
    }
}