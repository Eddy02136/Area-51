import {Injectable} from "@nestjs/common";
import {stringify} from "querystring";
import {ConfigService} from "@nestjs/config";
import axios from "axios";
import {UsersService} from "../../users/users.service";

@Injectable()
export class YoutubeService {
    private lastVideoId: string | null = null;
    constructor(private readonly configService: ConfigService,
                private readonly usersService: UsersService) {}

    private readonly scopes = [
        'https://www.googleapis.com/auth/youtube.force-ssl',
    ];

    getYouTubeAuthUrl(userId: string): string {
        const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
        const clientId = this.configService.get<string>('YOUTUBE_CLIENT_ID');
        const redirectUri = this.configService.get<string>('YOUTUBE_REDIRECT_URI');
        const scopes = this.scopes;

        const queryParams = {
            client_id: clientId,
            response_type: 'code',
            redirect_uri: redirectUri,
            scope: scopes.join(' '),
            state: state,
            access_type: 'offline',
            prompt: 'consent',
        };

        const queryString = stringify(queryParams);
        return `https://accounts.google.com/o/oauth2/v2/auth?${queryString}`;
    }

    async getYouTubeAccessToken(code: string) {
        const clientId = this.configService.get<string>('YOUTUBE_CLIENT_ID');
        const clientSecret = this.configService.get<string>('YOUTUBE_CLIENT_SECRET');
        const redirectUri = this.configService.get<string>('YOUTUBE_REDIRECT_URI');

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                scope: this.scopes.join(' '),
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { access_token, refresh_token, expires_in } = response.data;
            console.log(access_token)
            return { accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in };

        } catch (error) {
            throw new Error(`Failed to get YouTube access token: ${error.response?.data?.error_description || error.message}`);
        }
    }

    getVideoId(url: string | URL) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v') || urlObj.searchParams.get('/')[1];
    }

    async postComment(accessToken: any, url: string | URL, comment: any) : Promise<boolean> {
        console.log("postCommentary")
        try {
            console.log(url);
            const videoId = this.getVideoId(url);
            console.log(videoId);
            const response = await axios.post(
                'https://www.googleapis.com/youtube/v3/commentThreads',
                {
                    snippet: {
                        videoId: videoId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: comment,
                            },
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        part: 'snippet',
                    },
                }
            );

            console.log('Comment posted:', response.data);
            return true;
        } catch (error) {
            console.error('Error posting comment:', error);
            return false;
        }
    }

    async likeVideo(accessToken: string, url: string | URL): Promise<void> {
        try {
            const videoId: string = this.getVideoId(url);
            console.log(videoId);

            const data = {
                id: videoId,
                rating: "like"
            };

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://www.googleapis.com/youtube/v3/videos/rate',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);
            console.log('Video liked successfully:', response.data);
        } catch (error) {
            console.error('Error liking video:', error.message);
        }
    }


    async checkForNewVideo(accessToken : string, channelId: string): Promise<boolean> {
        try {
            const params = {
                part: 'snippet',
                channelId: channelId,
                maxResults: 1,
                order: 'date',
                type: 'video',
            };

            const headers = {
                Authorization: `Bearer ${accessToken}`
            };

            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params, headers });
            const videos = response.data.items;

            if (videos.length > 0) {
                const latestVideo = videos[0];
                const latestVideoId = latestVideo.id.videoId;

                if (this.lastVideoId && this.lastVideoId !== latestVideoId) {
                    console.log(`Nouvelle vidéo publiée : "${latestVideo.snippet.title}" (ID: ${latestVideoId})`);
                    return true;
                }

                this.lastVideoId = latestVideoId;
            } else {
                console.log("Aucune vidéo trouvée pour cette chaîne.");
            }
            return false;
        } catch (error) {
            console.error('Erreur lors de la vérification de nouvelles vidéos :', error.message);
            return false;
        }
    }

    async startCheckingForNewVideos(accessToken : string) : Promise<boolean> {
        console.log('check Video')
        const channelId: string = "UCtI0Hodo5o5dUb67FeUjDeA"; //Spacex channel id
        const newVideoFound = await this.checkForNewVideo(accessToken, channelId);
        if (newVideoFound) {
            return true;
        }
        return false;
    }

    async refreshYoutubeToken(userId: string): Promise<void> {
        const { refreshToken, expiresAt } = await this.usersService.getElemApiToken(userId, 'YouTube');
        const isTokenExpired = new Date() >= new Date(expiresAt);

        if (!isTokenExpired) {
            return;
        }

        const clientId = this.configService.get<string>('YOUTUBE_CLIENT_ID');
        const clientSecret = this.configService.get<string>('YOUTUBE_CLIENT_SECRET');
        const refreshTokenUrl = 'https://oauth2.googleapis.com/token';

        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
        });

        try {
            const response = await axios.post(refreshTokenUrl, body.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { access_token, expires_in} = response.data;
            await this.usersService.saveToken('YouTube', access_token, refreshToken, expires_in, userId);
        } catch (error) {
            console.error('Error refreshing YouTube token:', error);
            throw new Error('Failed to refresh YouTube token');
        }
    }
}