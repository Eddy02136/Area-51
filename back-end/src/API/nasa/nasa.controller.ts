import { Controller, Get } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('iss')
  async getIssPosition() {
    return await this.nasaService.getIssPosition();
  }
}
