import { BadRequestException, Headers, Injectable, NotFoundException, Response, UnauthorizedException } from '@nestjs/common';
import { User } from '../schema/User.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ApiToken } from "../schema/ApiToken.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel('ApiToken') private readonly apiTokenModel: Model<ApiToken>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) : Promise<{ token: string }> {
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

    const user = await newUser.save();
    const payload = { email: user.email, sub: user._id };

    const token : string = this.jwtService.sign(payload);

    return { token };
  }

  async login(createUserDto: CreateUserDto) : Promise<{ token: string }>  {
    const user : User = await this.userModel.findOne({ email: createUserDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatching : boolean = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };

    const token : string = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async checkToken(accessToken: string) : Promise<{ token : string }> {
    return { token: accessToken };
  }

  async getInfoUser(userId: string) {
    const user = await this.userModel.findById(userId).select('email firstname lastname');
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    return {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }

  async saveToken(apiName: string, accessToken: string, refreshToken: string, expiresIn: number, userId: string): Promise<void> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const existingTokenIndex = user.apiTokens.findIndex(token => token.apiName === apiName);

    let apiToken: ApiToken;
    if (refreshToken != "") {
      apiToken = new this.apiTokenModel({apiName, accessToken, refreshToken, expiresAt});
    } else {
      apiToken = new this.apiTokenModel({apiName, accessToken});
    }

    if (existingTokenIndex > -1) {
      user.apiTokens[existingTokenIndex] = apiToken;
    } else {
      user.apiTokens.push(apiToken);
    }
    await user.save();
  }

  async getToken(apiName: string, userId: unknown): Promise<string> {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const apiToken = user.apiTokens.find((token: ApiToken) => token.apiName === apiName);

    if (!apiToken) {
      return "";
    }

    return apiToken.accessToken;
  }

  async removeToken(apiName: string, userId: unknown): Promise<string> {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      return 'User not found';
    }

    const tokenIndex = user.apiTokens.findIndex((token: ApiToken) => token.apiName === apiName);
    if (tokenIndex === -1) {
      return 'User not connected to Spotify';
    }

    user.apiTokens.splice(tokenIndex, 1);

    await user.save();
    return ""
  }

  async updateUser(userId: string, updateUserDto : Partial<User>) {

    const allowedFields = ['firstname', 'lastname', 'email'];

    const fieldsToUpdate = Object.keys(updateUserDto).reduce((acc, key) => {
      if (updateUserDto[key] !== undefined && allowedFields.includes(key)) {
        acc[key] = updateUserDto[key];
      }
      return acc;
    }, {});

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, fieldsToUpdate, { new: true });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return 'User successfully updated';
  }
}
