import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (user) {
      const accessToken = await this.authService.generateAccessToken(user.id);
      return {
        message: `${user.email} is Logged In`,
        access_token: accessToken,
      };
    } else {
        throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND)
    }
  }
}
