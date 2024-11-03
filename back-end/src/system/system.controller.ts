import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SystemService } from "./system.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../schema/User.schema";
import { Interval } from '@nestjs/schedule';

@Controller('system')
@ApiTags('System')
export class SystemController {
  constructor() {}
}