import {Injectable} from "@nestjs/common";
import {ActionReaction} from "../schema/ActionReaction.schema";
import {InjectModel} from "@nestjs/mongoose";
import { ACTIONS_REACTIONS } from "./manage.constant";
import {Model} from "mongoose";

@Injectable()

export class ManageService {
    constructor(@InjectModel(ActionReaction.name) private readonly actionReactionModel: Model<ActionReaction>) {}

    async findActionReaction( userId: string, actionName: string, actionApi: string, reactionName: string, reactionApi: string, parameters: Record<string, any>) {
        return this.actionReactionModel.findOne({
            userId,
            actionName,
            actionApi,
            reactionName,
            reactionApi,
            parameters
        });
    }

    async addActionReaction(userId : string, actionName: string, actionApi: string, reactionName: string, reactionApi: string, parameters: any, schedule?: string ) {
        const actionReaction = new this.actionReactionModel({
            userId,
            actionName,
            actionApi,
            reactionName,
            reactionApi,
            parameters,
            schedule: schedule || null,
        });
        return await actionReaction.save();
    }

    async getActionReaction(userId: string) {
        const actionsReactions = await this.actionReactionModel.find({ userId });
        return actionsReactions.map(actionReaction => ({
            _id: actionReaction.id,
            actionName: actionReaction.actionName,
            actionApi: actionReaction.actionApi,
            reactionName: actionReaction.reactionName,
            reactionApi: actionReaction.reactionApi,
            parameters: actionReaction.parameters,
            schedule: actionReaction.schedule,
        }));
    }

    async deleteActionReaction(id: string) {
        return this.actionReactionModel.findByIdAndDelete(id);
    }

    async getInfoActionReaction() {
        return ACTIONS_REACTIONS;
    }
}