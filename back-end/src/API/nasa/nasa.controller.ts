import { Controller, Get } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('nasa')
@ApiTags('Nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('iss')
  async getIssPosition() {
    return await this.nasaService.getIssPosition();
  }
}
