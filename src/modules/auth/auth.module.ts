import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/modules/subscriptions/entities/subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MembershipGuard } from './guards/membership.guard';
import { JwtStrategy } from './jwtStrategy/jwtStrategy';

// Load environment variables manually
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Subscription]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, MembershipGuard],
  exports: [AuthService],
})
export class AuthModule {}
