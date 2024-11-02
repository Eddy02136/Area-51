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
            playMusic: {
                description: 'Play music of your choice (precise the name of the artist) on Spotify',
                parameters: { musicName: 'string'}
            },
        },
    },
    Nasa: {
        actions: {
            getIssPos: {
                description: 'Gets the position of the iss',
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
                description: 'Get when a new spacex video comes out',
                parameters: {}
            }
        },
        reactions: {
            postCommentary: {
                description: 'Post a comment on the video of your choice',
                parameters: {
                    videoUrl: 'string',
                    message: 'string'
                }
            },
            likeVideo: {
                description: 'Like video from your choice',
                parameters: {
                    videoUrl: 'string'
                }
            }
        }
    },
    Twitch: {
        actions: {
            getViewerNasa: {
                description: 'Check if Nasa have more than 5000 viewers',
                parameters: {}
            },
            streamerInLive: {
                description: 'Get if a streamer is in live',
                parameters: {
                    streamerName: 'string'
                }
            }
        },
        reactions: {
            sendMessage: {
                description: 'Send a message in the stream chat',
                parameters: {
                    streamerName: 'string',
                    message: 'string'
                }
            }
        }
    },
    Github: {
        actions: {
            followingUserGithub: {
                description: 'Following a user github',
                parameters: {}
            },
            changeUserGithub: {
                description: 'Change user Github',
                parameters: {}
            },
            followersUserGithub: {
                description: 'Followers user Github',
                parameters: {}
            }
        },
        reactions: {

        }
    }
};