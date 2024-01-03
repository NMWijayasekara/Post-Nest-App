import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])/, {message: "Use Upper Case Letters as well"})
  @Matches(/^(?=.*[a-z])/, {message: "Use Lower Case Letter as well"})
  @Matches(/^(?=.*\d)/, {message: "Atleast one number should be used"})
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
