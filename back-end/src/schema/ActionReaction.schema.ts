import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

@Schema()
export class ActionReaction extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

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
