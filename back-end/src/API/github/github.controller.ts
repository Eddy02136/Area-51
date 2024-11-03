import {Controller, Delete, Get, Headers, Query, Response, UseGuards} from "@nestjs/common";
import {ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GithubService} from "./github.service";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import * as jwt from "jsonwebtoken";
import * as process from "node:process";
import {UsersService} from "../../users/users.service";

@Controller('github')
@ApiTags('Github')
export class GithubController {
    constructor(private readonly githubService: GithubService,
                private usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get github authentication URL' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'Successful retrieval of the github authentication URL.', type: String })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('auth-url')
    getAuthUrl(@Headers('authorization') authorization: string, @Response() reply: FastifyReply){
        try {
            const jwtToken = authorization.replace('Bearer ', '');
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            const userId = (decoded as { sub: string }).sub;
            const authUrl = this.githubService.getGithubAuthUrl(userId);
            return reply.send({ url: authUrl });
        } catch (error) {
            reply.status(401).send(`Invalid or expired token: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Handle github callback and retrieve access token' })
    @ApiQuery({ name: 'code', required: true, description: 'The authorization code obtained from github' })
    @ApiResponse({ status: 200, description: 'Successful retrieval of the access token.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Authorization code is required.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('callback')
    async handleYouTubeCallback(@Query('code') code: string, @Query('state') state: string, @Response() reply: FastifyReply): Promise<void> {
        if (!code || !state) {
            return reply.status(400).send('Authorization code and state are required');
        }

        try {
            const { accessToken } = await this.githubService.getGithubAccessToken(code);
            const { userId } = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
            await this.usersService.saveToken('Github', accessToken, "", 0, userId);
            const frontendUrl = `http://localhost:8081/`;
            return reply.redirect(302, frontendUrl);
        } catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Check github connection' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'User is connected to github', schema: { example: 'Connected'}})
    @ApiResponse({ status: 201, description: 'User is not connected to github', schema: { example: 'Not connected'}})
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('check-connection')
    async checkConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;
        const token = await this.usersService.getToken('Github', userId);
        if (!token) {
            return reply.status(201).send('Not connected');
        }
        return reply.status(200).send('Connected');
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Logout github connection'})
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'Github logout successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
    @Delete('logout')
    async logoutConnection(@Headers('authorization') authorization: string, @Response() reply: FastifyReply) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;
        const result = await this.usersService.removeToken('Github', userId);
        if (result === "") {
            return reply.status(200).send('Github logout successfully.');
        }
        return reply.status(401).send(result);
    }
}
