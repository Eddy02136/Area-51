import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {ApiToken, ApiTokenSchema} from "./ApiToken.schema";

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: [ApiTokenSchema], default: [] })
  apiTokens: Types.Array<ApiToken>;
}

export const UserSchema = SchemaFactory.createForClass(User);