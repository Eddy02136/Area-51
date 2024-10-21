import {Controller, Get, Headers, Query, Response, UseGuards} from "@nestjs/common";
import {ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {YoutubeService} from "./youtube.service";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import * as jwt from "jsonwebtoken";
import * as process from "node:process";
import {UsersService} from "../../users/users.service";

@Controller('youtube')
@ApiTags('YouTube')
export class YouTubeController {

    constructor(private readonly youtubeService: YoutubeService,
                private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get YouTube authentication URL' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'Successful retrieval of the YouTube authentication URL.', type: String })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('auth-url')
    getAuthUrl(@Headers('authorization') authorization: string, @Response() reply: FastifyReply){
        try {
            const jwtToken = authorization.replace('Bearer ', '');
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            const userId = (decoded as { sub: string }).sub;
            const authUrl = this.youtubeService.getYouTubeAuthUrl(userId);
            return reply.send({ url: authUrl });
        } catch (error) {
            reply.status(401).send(`Invalid or expired token: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Handle YouTube callback and retrieve access token' })
    @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from YouTube' })
    @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('callback')
    async handleYouTubeCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply): Promise<void> {
        if (!code || !state) {
            return reply.status(400).send('Authorization code and state are required');
        }

        try {
            const { accessToken, refreshToken, expiresIn } = await this.youtubeService.getYouTubeAccessToken(code);
            const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
            await this.usersService.saveToken('YouTube', accessToken, refreshToken, expiresIn, userId);
            const frontendUrl = `http://localhost:3001/`;
            return reply.redirect(302, frontendUrl);
        } catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }
}