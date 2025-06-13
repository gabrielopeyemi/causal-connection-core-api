import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @ApiProperty({
    name: 'code',
    description: 'Verification code sent to the user',
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    name: 'type',
    description: 'Type of verification, either email or phone',
    enum: ['email', 'phone'],
  })
  @IsIn(['email', 'phone'])
  type: 'email' | 'phone';

  @ApiProperty({
    name: 'token',
    description: 'Verification token for the user',
  })
  @IsNotEmpty()
  token: string;
}
