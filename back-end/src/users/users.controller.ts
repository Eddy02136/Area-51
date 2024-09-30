import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    console.log('UsersService:', userService);
  }

  @Post('signing')
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Validation échouée.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Connexion réussie.' })
  @ApiResponse({ status: 400, description: 'Validation échouée.' })
  loginUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.loginUser(createUserDto);
  }
}
