import {Body, Controller, Get, Headers, Post, Response, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ManageService} from "./manage.service";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import {CreateActionReactionDto} from "./dto/create-action-reaction.dto";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";


@Controller('manage')
@ApiTags('Manage')
export class ManageController {constructor( private readonly manageService: ManageService ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('add-action-reaction')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add an action-reaction pair for a user' })
    @ApiBody({ type: CreateActionReactionDto })
    @ApiResponse({ status: 201, description: 'Action-reaction pair added successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async addActionReaction( @Headers('authorization') authorization: string, @Body() createActionReactionDto: CreateActionReactionDto, @Response() reply: FastifyReply ) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;

        const { action, action_api, reaction, reaction_api, parameters, schedule } = createActionReactionDto;
        if (!action || !action_api || !reaction || !reaction_api || !parameters) {
            return reply.status(400).send('Bad Request. Invalid data format.');
        }
        await this.manageService.addActionReaction(userId, action, action_api, reaction, reaction_api, parameters, schedule);
        return reply.status(200).send('Action reaction added successfully.');
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('get-action-reaction')
    async getActionReaction(@Headers('authorization') authorization: string) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;
        return await this.manageService.getActionReaction(userId);
    }
}