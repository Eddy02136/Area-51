import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../utils/jwt.strategy';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/User.schema';
import {AuthGuard} from "@nestjs/passport";

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
    ]),
    JwtModule.register({
      secret: 'unhommebleuquiaimelesbananes',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [MongooseModule, UsersService],
})

export class UsersModule {}
