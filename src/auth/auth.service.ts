import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password);

    const payload = {
      email: user.email,
      id: user.id,
      licensePlate: user.licensePlate,
      membership: user.membership,
    };

    return new LoginResponseDto(this.jwtService.sign(payload));
  }

  async signup(user: CreateUserDto): Promise<LoginResponseDto> {
    const userExists = await this.userService.findByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create(user);

    return this.login(user.email, user.password);
  }
}
