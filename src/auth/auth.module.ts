import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
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
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // put your real secret here
      signOptions: { expiresIn: '1h' },
    }),
    MailingModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, MailingService],
})
export class AuthModule {}
