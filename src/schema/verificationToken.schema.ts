import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class VerificationToken {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true, enum: ['email', 'phone'] })
  type: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export type VerificationTokenDocument = VerificationToken & Document;

export const VerificationTokenSchema =
  SchemaFactory.createForClass(VerificationToken);

// Optional: Index for auto-delete expired tokens (TTL)
VerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
