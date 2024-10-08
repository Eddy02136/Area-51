import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as string_decoder from "node:string_decoder";

@Schema()
export class ActionReaction extends Document {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ required: true, type: String })
  actionType: string;

  @Prop({ required: true, type: String })
  reactionType: string;

  @Prop({ required: true, type: Object })
  parameters: any;

  @Prop({ type: String, default: null })
  schedule: string;
}

export const ActionReactionSchema = SchemaFactory.createForClass(ActionReaction);
