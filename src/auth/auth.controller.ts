import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { LoginDto, RegisterUserDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseGuards(AdminGuard)
  @ApiBody({
    description: 'User Details',
    type: RegisterUserDto,
  })
  @ApiOperation({
    summary:
      'Create New User with Email and Password. Taking User Name as well',
  })
  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.register(data);
  }

  @ApiBody({
    description: 'User Login Creditionals',
    type: LoginDto,
  })
  @ApiOperation({ summary: 'Login User and return JWT Access Token' })
  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (user) {
      const accessToken = await this.authService.generateAccessToken(user.id);
      return {
        message: `${user.email} is Logged In`,
        access_token: accessToken,
      };
    } else {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
