/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import { SignupDto, LoginDto, VerifyDto } from './dto';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let user: User & { _id: string };

    const existingUser: (User & { _id: string }) | any =
      await this.usersService.findByEmail(dto.email);

    this.logger.debug('dto:', dto);
    this.logger.debug('existingUser:', existingUser);

    if (existingUser && !existingUser.isVerified) {
      user = (await this.usersService.updateUser(existingUser?._id, {
        ...dto,
        password: hashedPassword,
      })) as User & { _id: string };
    } else {
      user = (await this.usersService.create({
        ...dto,
        password: hashedPassword,
      })) as User & { _id: string };
    }

    this.logger.debug('creating user:', dto);

    this.logger.log('creating token for user:', user.email);
    const token = await this.generateToken(user);

    this.logger.log('storing verification token for user:', user.email);
    await this.usersService.createVerificationToken({
      userId: user._id,
      type: 'email',
      token: token.access_token, // Use the JWT token as the verification token
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours
    });

    this.logger.log('sending verification email to:', user.email);
    await this.usersService.sendVerificationEmail({
      email: user.email,
      token: token.access_token,
    });

    return {
      success: true,
      message: 'User created successfully. Please verify your email.',
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  // async verify(dto: VerifyDto) {
  //   // Stub for now — simulate verification success
  //   return { success: true, message: `${dto.type} verified successfully.` };
  // }

  async verify(dto: VerifyDto) {
    const { type, token } = dto;

    // Find the user or verification record by token and type
    const verificationRecord =
      await this.usersService.findVerificationRecordByTokenAndType(token, type);

    if (!verificationRecord) {
      return {
        success: false,
        message: 'Invalid or expired verification token.',
      };
    }

    // Mark the user as verified for the given type
    const userId = verificationRecord.userId;
    await this.usersService.markVerified(userId, type);

    // Optionally delete or expire the verification record to prevent reuse
    await this.usersService.deleteVerificationRecord(token);

    return { success: true, message: `${type} verified successfully.` };
  }

  async logout() {
    // On frontend: remove JWT; optionally implement a token blacklist
    return { success: true, message: 'Logged out' };
  }

  async getSession(user: any) {
    return this.usersService.findById(user.sub);
  }

  private async generateToken(user: any) {
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwt.sign(payload),
      user: { id: user._id, email: user.email, name: user.name },
    };
  }
}
