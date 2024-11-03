import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as string_decoder from "node:string_decoder";

@Schema()
export class ActionReaction extends Document {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ required: true, type: String })
  areaName: string;

  @Prop({ required: true, type: String })
  actionName: string;

  @Prop({ required: true, type: String })
  actionApi: string;

  @Prop({ required: true, type: String })
  reactionName: string;

  @Prop({ required: true, type: String })
  reactionApi: string;

  @Prop({ required: true, type: Object })
  parameters: any;

}

export const ActionReactionSchema = SchemaFactory.createForClass(ActionReaction);
