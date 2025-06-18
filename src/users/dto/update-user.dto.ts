import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Opeyemi',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Famosipe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'I am a software engineer',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example: 'he/him',
  })
  @IsOptional()
  @IsString()
  pronouns?: string;

  @ApiProperty({
    example: 'Seattle, WA',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiProperty({
    example: ['swimming'],
  })
  @IsOptional()
  @IsArray()
  interests?: string[];
}
