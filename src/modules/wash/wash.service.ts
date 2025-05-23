import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wash } from './entities/wash.entity';
import { Repository } from 'typeorm';
import { CreateWashDto } from './dto/create-wash.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class WashService {
  constructor(
    @InjectRepository(Wash)
    private washRepository: Repository<Wash>,
    private readonly usersService: UsersService,
  ) {}

  async create(createWashDto: CreateWashDto) {
    const user = await this.usersService.findOne(createWashDto.user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const wash = this.washRepository.create({
      wash_location: createWashDto.wash_location,
      user: user,
    });
    return this.washRepository.save(wash);
  }

  findByUserId(userId: number) {
    return this.washRepository.find({
      where: { user: { id: userId } },
    });
  }
}
