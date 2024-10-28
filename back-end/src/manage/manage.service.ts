import {Injectable} from "@nestjs/common";
import {ActionReaction} from "../schema/ActionReaction.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()

export class ManageService {
    constructor(@InjectModel(ActionReaction.name) private readonly actionReactionModel: Model<ActionReaction>) {}

    async findActionReaction( userId: string, action: string, action_api: string, reaction: string, reaction_api: string, parameters: Record<string, any>) {
        return this.actionReactionModel.findOne({
            userId,
            actionType: action,
            action_api,
            reactionType: reaction,
            reaction_api,
            parameters
        });
    }

    async addActionReaction(userId : string, action: string, action_api: string, reaction: string, reaction_api: string, parameters: any, schedule?: string ) {
        const actionReaction = new this.actionReactionModel({
            userId,
            actionType: action,
            action_api: action_api,
            reactionType: reaction,
            reaction_api: reaction_api,
            parameters,
            schedule: schedule || null,
        });
        return await actionReaction.save();
    }

    async getActionReaction(userId: string) {
        return this.actionReactionModel.find({userId});
    }
}