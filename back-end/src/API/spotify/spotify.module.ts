import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../../users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    UsersModule,
  ],
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
