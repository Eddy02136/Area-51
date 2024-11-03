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
                                name: "Check_username_changed",
                                description: "Check if username discord have changed"
                            }, {
                                name: "Check_join_server",
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
                            name: "play_music",
                            description: "Play music on Spotify"
                        }, {
                            name: "play_playlist",
                            description: "Play playlist on Spotify"
                        }, {
                            name: "set_volume_max",
                            description: "Sets current music volume to max"
                        }]
                    },
                    {
                        name: 'youtube',
                        actions: [{
                            name: "check_new_spacex_video",
                            description: "Check if SpaceX has posted a new video"
                        }],
                        reactions: [{
                            name: "post_commentary",
                            description: "A new commentary is posted on a video"
                        }, {
                            name: "like_video",
                            description: "Like video from your choice"
                        }]
                    },
                    {
                        name: 'github',
                        actions: [{
                            name: "check_user_following",
                            description: "Check if user follow new person",
                        }, {
                            name: "check_username_changed",
                            description: "Check if username github have changed"
                        }, {
                            name: "check_followers",
                            description: "Check if user is follow by a new person"
                        }],
                        reactions: []
                    },
                    {
                        name: 'twitch',
                        actions: [{
                            name: "check_nasa_viewers",
                            description: "Check if Nasa have more than 5000 viewers"
                        }, {
                            name: "check_live_streamer",
                            description: "Get if a streamer is in live"
                        }],
                        reactions: [{
                            name: "send_message",
                            description: "Send a message in the stream chat"
                        }]
                    },
                    {
                        name: 'nasa',
                        actions: [{
                            name: "get_iss_position",
                            description: "Gets the position of the iss"
                        }],
                        reactions: []
                    }
                ],
            },
        };
    }
}