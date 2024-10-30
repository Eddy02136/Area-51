import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {ApiToken} from "./ApiToken.interface";

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

  @Prop({
    type: [{
        apiName: {type: String, required: true},
        accessToken: { type: String, required: true },
        refreshToken: { type: String },
        expiresAt: { type: Date }}],
    default: [],
  })
  apiTokens: Types.Array<ApiToken>;
}

export const UserSchema = SchemaFactory.createForClass(User);