import {Controller, Get, Req} from "@nestjs/common";
import {AboutService} from "./about.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('')
export class AboutController {
    constructor(private readonly aboutService: AboutService) {}

    @ApiTags('About')
    @ApiOperation({ summary: 'Get all action reactions in the application' })
    @ApiResponse({ status: 200, description: 'Get all action reactions successfully.',
    schema: {
        example: {
            client: {
                host: "string",
            },
            server: {
                current_time: 'number',
                services: [{
                        name: 'string',
                        actions: [{
                            name: "string",
                            description: "string"
                        }, {
                            name: "string",
                            description: "string"
                        }],
                        reactions: [{
                            name: "string",
                            description: "string"
                        }, {
                            name: "string",
                            description: "string"
                        }],
                },]
            }
        }
    }})
    @Get('about.json')
    async getAbout(@Req() request: Request) : Promise<AboutService> {
        return this.aboutService.about(request);
    }
}