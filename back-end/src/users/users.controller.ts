import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Body, Controller, Get, Headers, Post, UseGuards} from '@nestjs/common';
import {User} from "../schema/User.schema";
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
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
  @ApiResponse({status: 201, description: 'User successfully check token.' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  checkToken(@Headers('authorization') authorization: string) : Promise<{ token: string }> {
    return this.userService.checkToken(authorization);
  }
}
