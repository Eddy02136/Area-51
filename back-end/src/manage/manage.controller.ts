import {Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";


@Controller('manage')
@ApiTags('Manage')

export class ManageController {constructor() {

    @Post('add-action-reaction')
    async addActionReaction() {
        return await this.manageService.addActionReaction();
    }
}}