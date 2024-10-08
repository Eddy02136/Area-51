import { Injectable } from "@nestjs/common";
import { ActionReaction } from "../schema/ActionReaction.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()

export class ManageService {
    constructor(@InjectModel(ActionReaction.name) private readonly actionReactionModel: Model<ActionReaction>) {}

    async addActionReaction(userId : string, action: string, reaction: string, parameters: any, schedule?: string ) {
        const actionReaction = new this.actionReactionModel({
            userId,
            actionType: action,
            reactionType: reaction,
            parameters,
            schedule: schedule || null,
        });
        return await actionReaction.save();
    }
}