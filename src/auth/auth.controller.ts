import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { SignupDto, LoginDto, VerifyDto } from './dto';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    this.logger.debug('signup dto:', dto);
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('verify')
  verify(@Body() dto: VerifyDto) {
    return this.authService.verify(dto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('session')
  session(@Req() req: Request) {
    return this.authService.getSession(req.user);
  }
}
