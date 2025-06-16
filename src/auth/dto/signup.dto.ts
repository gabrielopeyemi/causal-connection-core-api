import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    name: 'email',
    description: 'User email address',
    example: 'famosipe2025@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'User password',
    minLength: 6,
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({
    name: 'firstName',
    required: false,
    example: 'Kyo',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    name: 'lastName',
    required: false,
    example: 'Yup',
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
