import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../schema/User.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (!createUserDto.firstname || !createUserDto.lastname || !createUserDto.email || !createUserDto.password) {
      throw new BadRequestException('Required fields are missing in the request body.');
    }
    if (createUserDto.password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user,
    };
  }
}
