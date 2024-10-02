import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { NasaModule } from './API/nasa/nasa.module';
import * as process from 'node:process';
import { DiscordModule } from './API/discord/discord.module';

dotenv.config();

console.log(process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    DiscordModule,
    NasaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
