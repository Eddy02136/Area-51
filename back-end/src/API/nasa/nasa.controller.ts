import { Controller, Get, UseGuards } from '@nestjs/common';
import { NasaService } from './nasa.service';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('nasa')
@ApiTags('Nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('iss')
  @ApiOperation({ summary: 'Get the current position of the ISS (International Space Station)' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the ISS position.', type: Object})
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing JWT.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getIssPosition() {
    return await this.nasaService.getIssPosition();
  }
}
