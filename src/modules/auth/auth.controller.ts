import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(
      loginRequestDto.email,
      loginRequestDto.password,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
