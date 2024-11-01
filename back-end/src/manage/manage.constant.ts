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
            newVideoSpaceX: {
                parameters: {}
            }
        },
        reactions: {
            postCommentary: {
                parameters: {
                    videoUrl: 'string',
                    message: 'string'
                }
            },
            likeVideo: {
                parameters: {
                    videoUrl: 'string'
                }
            }
        }
    },
    Twitch: {
        actions: {
            getViewerNasa: {
                parameters: {}
            },
            nasaInLive: {
                parameters: {}
            }
        },
        reactions: {
            sendNasaMessage: {
                parameters: {
                    message: 'string'
                }
            }
        }
    },
    Github: {
        actions: {

        },
        reactions: {

        }
    }
};