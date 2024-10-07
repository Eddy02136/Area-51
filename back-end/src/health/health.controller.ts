import {Controller, Get} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { HealthService } from "./health.service";


@Controller('health')
@ApiTags('Health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get('ping')
    @ApiOperation({ summary: 'Get response from Area51 API' })
    @ApiResponse({ status: 200, description: 'Area51 API responded successfully.' })
    async getPing() {
        return this.healthService.getPing();
    }
}
