import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  // Param,
  // ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user information',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user information',
    type: User,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully',
    type: User,
  })
  @ApiOperation({ summary: 'Update user subscription' })
  @ApiResponse({
    status: 200,
    description: 'User subscription updated successfully',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User or subscription not found' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('change-subscription')
  changeSubscription(
    @Request() req,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.usersService.updateSubscription(
      req.user.id,
      updateSubscriptionDto.subscriptionId,
    );
  }

  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
