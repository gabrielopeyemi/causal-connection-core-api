/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schema/user.schema';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { MailingService } from 'src/mailing/mailing.service';
import {
  VerificationToken,
  VerificationTokenDocument,
} from 'src/schema/verificationToken.schema';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(VerificationToken.name)
    private verificationTokenModel: Model<VerificationTokenDocument>,
    private mailingService: MailingService,
  ) {}

  async create(signupDto: SignupDto): Promise<User> {
    const createdUser = new this.userModel({
      ...signupDto,
      isVerified: false,
    });

    const user = await createdUser.save();

    return user;
  }

  async sendVerificationEmail({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) {
    await this.mailingService.sendVerificationEmail(email, token);
  }

  async createVerificationToken({
    userId,
    type,
    token,
    expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours
  }: {
    userId: string;
    type: string;
    expiresAt?: Date;
    token?: string;
  }) {
    return await this.verificationTokenModel.create({
      userId,
      type,
      token,
      expiresAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async getMe(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateMe(userId: string, dto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(userId, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserHangouts(userId: string): Promise<any[]> {
    const user = await this.userModel
      .findById(userId)
      .populate(['joinedHangouts', 'hostedHangouts']);
    if (!user) throw new NotFoundException('User not found');
    return [...user.joinedHangouts, ...user.hostedHangouts];
  }

  async searchUsers(q: string): Promise<User[]> {
    return this.userModel
      .find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { interests: { $in: [new RegExp(q, 'i')] } },
        ],
      })
      .limit(20);
  }

  async markVerified(userId: string | any, type: string) {
    // Dynamically update the correct field based on type
    const updateFields: Partial<Record<string, boolean>> = {};

    if (type === 'email') {
      updateFields['isEmailVerified'] = true;
    } else if (type === 'phone') {
      updateFields['isPhoneVerified'] = true;
    } else {
      throw new NotFoundException('Invalid verification type');
    }

    const result = await this.userModel
      .findByIdAndUpdate(userId, updateFields, { new: true })
      .exec();

    if (!result) throw new NotFoundException('User not found');

    return result;
  }

  async deleteVerificationRecord(token: string) {
    // Delete the used verification token so it can't be reused
    await this.verificationTokenModel.deleteOne({ token }).exec();
  }

  async findVerificationRecordByTokenAndType(token: string, type: string) {
    const now = new Date();

    // Find one verification token record matching token and type that has not expired
    const record = await this.verificationTokenModel
      .findOne({
        token,
        type,
        expiresAt: { $gt: now }, // not expired
      })
      .exec();

    return record;
  }
  
}
