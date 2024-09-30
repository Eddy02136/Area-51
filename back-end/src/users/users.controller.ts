import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    console.log('UsersService:', userService);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
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
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    schema: {
      example: {
        token: 'string',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  loginUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.loginUser(createUserDto);
  }
}
