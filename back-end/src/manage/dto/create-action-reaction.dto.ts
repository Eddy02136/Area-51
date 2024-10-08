import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateActionReactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    action: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reaction: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    parameters: any;

    @ApiProperty()
    @IsString()
    schedule?: string;
}