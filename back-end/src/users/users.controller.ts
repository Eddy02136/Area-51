import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signing')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.loginUser(createUserDto);
  }
}
