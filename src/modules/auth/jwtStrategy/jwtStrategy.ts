import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwtPayloadDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY') || 'secret',
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = {
      id: payload.id,
      email: payload.email,
      licensePlate: payload.licensePlate,
      subscriptionId: payload.subscriptionId,
    };

    return user;
  }
}
