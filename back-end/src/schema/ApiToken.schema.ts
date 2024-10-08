import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApiToken extends Document {
    @Prop({ required: true, type: String })
    apiName: string;

    @Prop({ required: true, type: String })
    accessToken: string;

    @Prop({ required: false, type: String })
    refreshToken: string;

    @Prop({ required: true, type: Date })
    expiresAt: Date;
}

export const ApiTokenSchema = SchemaFactory.createForClass(ApiToken);