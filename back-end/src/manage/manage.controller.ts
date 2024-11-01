import {Body, Controller, Delete, Get, Headers, Param, Post, Response, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ManageService} from "./manage.service";
import * as jwt from 'jsonwebtoken';
import * as process from "node:process";
import {CreateActionReactionDto} from "./dto/create-action-reaction.dto";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import {ACTIONS_REACTIONS} from "./manage.constant";


@Controller('manage')
@ApiTags('Manage')
export class ManageController {constructor( private readonly manageService: ManageService ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('add-action-reaction')
    @ApiOperation({ summary: 'Add an action-reaction pair for a user' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiBody({ type: CreateActionReactionDto })
    @ApiResponse({ status: 200, description: 'Action reaction added successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
    @ApiResponse({ status: 409, description: 'Conflict. This action-reaction configuration already exists.'})
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async addActionReaction( @Headers('authorization') authorization: string, @Body() createActionReactionDto: CreateActionReactionDto, @Response() reply: FastifyReply ) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;

        const { actionName, actionApi, reactionName, reactionApi, parameters, schedule } = createActionReactionDto;
        if (!actionName || !actionApi || !reactionName || !reactionApi || !parameters) {
            return reply.status(400).send('Bad Request. Invalid data format.');
        }
        const actionApiName = ACTIONS_REACTIONS[actionApi];
        const reactionApiName = ACTIONS_REACTIONS[reactionApi];
        console.log(actionApiName);
        console.log(reactionApiName);
        if (!actionApiName || !reactionApiName) {
            return reply.status(400).send('Bad Request. Invalid data format.');
        }
        const action = ACTIONS_REACTIONS[actionApi]?.actions[actionName];
        const reaction = ACTIONS_REACTIONS[reactionApi]?.reactions[reactionName];
        console.log(action)
        console.log(reaction)
        if (!action || !reaction) {
            return reply.status(400).send('Bad Request. Invalid data format.');
        }
        const existingActionReaction = await this.manageService.findActionReaction(userId, actionName, actionApi, reactionName, reactionApi, parameters);
        if (existingActionReaction) {
            return reply.status(409).send('Conflict. This action-reaction configuration already exists.');
        }
        await this.manageService.addActionReaction(userId, actionName, actionApi, reactionName, reactionApi, parameters, schedule);
        return reply.status(200).send('Action reaction added successfully.');
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get all actions reactions for a user' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({
        status: 200,
        description: 'Get all action-reaction configurations for a user',
        schema: {
            example: [
                {
                    "_id": "string",
                    "actionName": "string",
                    "actionApi": "string",
                    "reactionName": "string",
                    "reactionApi": "string",
                    "parameters": {
                        "city": "string",
                        "music": "string"
                    },
                    "schedule": null
                },
            ]
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get('get-action-reaction')
    async getActionReaction(@Headers('authorization') authorization: string) {
        const jwtToken = authorization.replace('Bearer ', '');
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = (decoded as { sub: string }).sub;
        return await this.manageService.getActionReaction(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Delete an action reactions for a user' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiHeader({ name: 'id', required: true, description: 'action reaction id to delete it'})
    @ApiResponse({ status: 200, description: 'Action reaction delete successfully' })
    @ApiResponse({ status: 404, description: 'Action-reaction not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.'})
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Delete('delete-action-reaction/:id')
    async deleteActionReaction(@Param('id') id: string, @Response() reply: FastifyReply) {
        const result = await this.manageService.deleteActionReaction(id);
        if (!result) {
            return reply.status(404).send('Action-reaction not found.');
        }
        return reply.status(200).send('Action reaction delete successfully');
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllAction')
    @ApiOperation({ summary: 'Get info about every actions' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'Get actions successfully.',
        schema: {
        example:
            [
                {
                    "service": "string",
                    "name": "string",
                    "parameters": {
                        "parameterName": "string"
                    }
                }
            ]
        }})
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.'})
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getAllActions() {
        const actions = [];
        Object.keys(ACTIONS_REACTIONS).forEach(serviceName => {
            const service = ACTIONS_REACTIONS[serviceName];
            Object.keys(service.actions).forEach(actionName => {
                actions.push({
                    service: serviceName,
                    name: actionName,
                    parameters: service.actions[actionName].parameters
                });
            });
        });
        return actions;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllReaction')
    @ApiOperation({ summary: 'Get info about every reactions' })
    @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
    @ApiResponse({ status: 200, description: 'Get reactions successfully.',
        schema: {
            example:
                [
                    {
                        "service": "string",
                        "name": "string",
                        "parameters": {
                            "parameterName": "string"
                        }
                    }
                ]
        }})
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.'})
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getAllReactions() {
        const reactions = [];
        Object.keys(ACTIONS_REACTIONS).forEach(serviceName => {
            const service = ACTIONS_REACTIONS[serviceName];
            Object.keys(service.reactions).forEach(reactionName => {
                reactions.push({
                    service: serviceName,
                    name: reactionName,
                    parameters: service.reactions[reactionName].parameters
                });
            });
        });
        return reactions;
    }
}