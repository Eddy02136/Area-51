import {Controller, Get, Req} from "@nestjs/common";
import {AboutService} from "./about.service";
import {ApiTags} from "@nestjs/swagger";

@Controller('')
export class AboutController {
    constructor(private readonly aboutService: AboutService) {}

    @ApiTags('About')
    @Get('about.json')
    async getAbout(@Req() request: Request) : Promise<AboutService> {
        return this.aboutService.about(request);
    }
}