export const ACTIONS_REACTIONS = {
    Discord: {
        actions: {

        },
        reactions: {

        },
    },
    Spotify: {
        actions: {

        },
        reactions: {
            playMusic: { parameters: { trackId: 'string'} },
        },
    },
    Nasa: {
        actions: {
            getIssPos: {
                parameters: {
                    city: 'string'
                }
            },
        },
        reactions: {

        },
    },
    Youtube: {
        actions: {

        },
        reactions: {
            postCommentary: {
                parameters: {
                    videoUrl: 'string',
                    commentMessage: 'string'
                }
            }
        }
    },
    Twitch: {
        actions: {

        },
        reactions: {

        }
    },
    Github: {
        actions: {

        },
        reactions: {

        }
    }
};