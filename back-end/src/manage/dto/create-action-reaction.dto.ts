import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateActionReactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    areaName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    actionName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    actionApi: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reactionName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reactionApi: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    parameters: any;

}