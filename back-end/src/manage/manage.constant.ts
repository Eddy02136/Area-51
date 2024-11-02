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
            playMusic: { parameters: { musicName: 'string'} },
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
            streamerInLive: {
                parameters: {
                    streamerName: 'string'
                }
            }
        },
        reactions: {
            sendMessage: {
                parameters: {
                    streamerName: 'string',
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