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
  constructor(
    private readonly systemService: SystemService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Interval(6000)
  async checkAndManageActionsReactionsUsers(): Promise<void>{
    const users = await this.userModel.find().exec()
    for (const user of users) {
      await this.systemService.handleActionReaction(user._id);
    }
  }
}