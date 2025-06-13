import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
class User {
  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  pronouns?: string;

  @Prop()
  bio?: string;

  @Prop()
  profilePhoto?: string;

  @Prop()
  city?: string;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Hangout' }],
    default: [],
  })
  joinedHangouts: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Hangout' }],
    default: [],
  })
  hostedHangouts: MongooseSchema.Types.ObjectId[];

  @Prop({ default: false })
  verificationToken: string;

  @Prop({ default: false })
  isVerified: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

// Optional: pre-save or method hooks could go here

export { UserSchema, User };
