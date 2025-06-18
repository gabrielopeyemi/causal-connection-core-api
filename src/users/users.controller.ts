import { Controller, Get, Put, Param, Query, Body, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  getMe(@Req() req: Request) {
    console.log('req.user:', req.user);
    return this.usersService.getMe(req.user['sub']);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('me')
  updateMe(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(req.user['sub'], dto);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId/hangouts')
  getUserHangouts(@Param('userId') userId: string) {
    return this.usersService.getUserHangouts(userId);
  }

  @Get('search')
  searchUsers(@Query('q') q: string) {
    return this.usersService.searchUsers(q);
  }
}
