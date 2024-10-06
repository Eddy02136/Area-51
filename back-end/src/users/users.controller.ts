import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import {User} from "../schema/User.schema";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Required fields are missing in the request body.' })
  @ApiResponse({ status: 401, description: 'Invalid Password' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  register(@Body() createUserDto: CreateUserDto) : Promise<User> {
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
}
