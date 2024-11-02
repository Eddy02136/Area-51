import {Controller, Get, Response, UseGuards} from '@nestjs/common';
import { NasaService } from './nasa.service';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {FastifyReply} from "fastify";

@Controller('nasa')
@ApiTags('Nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  async getIssPosition() {
    return await this.nasaService.getIssPosition();
  }
}
