import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NasaController } from './nasa.controller';
import { NasaService } from './nasa.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      HttpModule,
      ConfigModule.forRoot()
  ],
  controllers: [NasaController],
  providers: [NasaService],
  exports: [NasaService],
})
export class NasaModule {}
