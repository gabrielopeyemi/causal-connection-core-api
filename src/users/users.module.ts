import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { MailingModule } from 'src/mailing/mailing.module';
import { MailingService } from 'src/mailing/mailing.service';
import {
  VerificationToken,
  VerificationTokenSchema,
} from 'src/schema/verificationToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: VerificationToken.name, schema: VerificationTokenSchema },
    ]),
    MailingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, MailingService],
})
export class UsersModule {}
