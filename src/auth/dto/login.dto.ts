import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'User email address',
    example: 'famosipe2025@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    description: 'User password',
    minLength: 6,
    example: 'password123',
  })
  password: string;
}
