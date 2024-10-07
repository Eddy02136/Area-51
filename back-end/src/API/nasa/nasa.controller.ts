import { Controller, Get, UseGuards } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('nasa')
@ApiTags('Nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('iss')
  async getIssPosition() {
    return await this.nasaService.getIssPosition();
  }
}
