import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return { message: 'Logged In' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  protectedData(): string {
    return this.appService.getProtectedData();
  }
}
