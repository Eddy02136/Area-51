import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import {ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Headers, Post, Put, UseGuards} from '@nestjs/common';
import {User} from "../schema/User.schema";
import {AuthGuard} from "@nestjs/passport";
import {FastifyReply} from "fastify";
import * as jwt from "jsonwebtoken";
import * as process from "node:process";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'User successfully created.',
    schema: {example: { token: 'string' }},
  })
  @ApiResponse({ status: 400, description: 'Required fields are missing in the request body.' })
  @ApiResponse({ status: 401, description: 'Invalid Password' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  register(@Body() createUserDto: CreateUserDto) : Promise<{ token: string }> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiBody({
    schema: {
      example: {
        email: 'string',
        password: 'string',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully created.',
    schema: {example: { token: 'string' }},
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  login(@Body() createUserDto: CreateUserDto) : Promise<{ token: string }> {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checkToken')
  @ApiOperation({ summary: 'Check token' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({status: 201, description: 'User successfully check token.' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  checkToken(@Headers('authorization') authorization: string) : Promise<{ token: string }> {
    return this.userService.checkToken(authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('infos')
  @ApiOperation({ summary: 'Info user' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiResponse({status: 201, description: 'Get info user successfully.',
    schema: {example: { email: 'string', firstname: 'string', lastname: 'string'}},})
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @ApiResponse({ status: 401, description: 'Invalid user'})
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getUserInfo(@Headers('authorization') authorization: string){
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    return this.userService.getInfoUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  @ApiOperation({ summary: 'Update user' })
  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token for Area51 API access' })
  @ApiBody({schema: {example: { email: 'string', firstname: 'string', lastname: 'string'}}})
  @ApiResponse({ status: 200, description: 'User successfully updated.'})
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @ApiResponse({ status: 401, description: 'Invalid user'})
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  updateUserInfo(@Headers('authorization') authorization: string, @Body() updateUserDto: Partial<User>) {
    const jwtToken = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = (decoded as { sub: string }).sub;
    return this.userService.updateUser(userId, updateUserDto);
  }
}
