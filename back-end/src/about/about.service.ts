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
                        actions: [
                        ],
                        reactions: [
                        ],
                    },
                    {
                        name: 'spotify',
                        actions: [
                        ],
                        reactions: [{
                            "name": "lunch_music",
                            "description": "A music is lunch on your spotify application."
                        }]
                    },
                    {
                        name: 'youtube',
                        actions: [],
                        reactions: [{
                            name: "post_commentary",
                            description: "A new commentary is posted on a video"
                        }]
                    },
                    {
                        name: 'github',
                        actions: [],
                        reactions: []
                    },
                    {
                        name: 'twitch',
                        actions: [],
                        reactions: []
                    },
                    {
                        name: 'nasa',
                        actions: [],
                        reactions: []
                    }
                ],
            },
        };
    }
}