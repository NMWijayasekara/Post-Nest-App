import { Get, Injectable, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppService {

  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(@Request() req) {
    return req.user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
