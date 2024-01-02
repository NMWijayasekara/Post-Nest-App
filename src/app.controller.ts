import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("Profile")
  @ApiOperation({ summary: "Shows User Details and User Posts"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
