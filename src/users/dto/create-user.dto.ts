import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'admin', description: 'Unique username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;
}