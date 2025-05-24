import {
  Controller,
  Get,
  // Param,
  // ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) {
  //   return this.usersService.findOne(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
