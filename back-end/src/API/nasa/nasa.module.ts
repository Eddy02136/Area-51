import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NasaController } from './nasa.controller';
import { NasaService } from './nasa.service';

@Module({
  imports: [HttpModule],
  controllers: [NasaController],
  providers: [NasaService],
})
export class NasaModule {}
