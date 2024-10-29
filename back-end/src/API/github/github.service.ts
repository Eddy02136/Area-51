import {Injectable} from "@nestjs/common";
import {stringify} from "querystring";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GithubService {
    constructor(private readonly configService: ConfigService) {}

    private readonly scopes = ['repo', 'user'];

    getGithubAuthUrl(userId: string): string {
        const state = Buffer.from(JSON.stringify({ userId })).toString('base64');
        const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
        const redirectUri = this.configService.get<string>('GITHUB_REDIRECT_URI');
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
        return `https://github.com/login/oauth/authorize?${queryString}`;
    }

    async getGithubAccessToken(code: string) {
        const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');
        const redirectUri = this.configService.get<string>('GITHUB_REDIRECT_URI');

        try {
            const response = await axios.post('https://github.com/login/oauth/access_token', new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri,
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            });

            const { access_token } = response.data;
            return { accessToken: access_token};

        } catch (error) {
            throw new Error(`Failed to get Github access token: ${error.response?.data?.error_description || error.message}`);
        }
    }
}