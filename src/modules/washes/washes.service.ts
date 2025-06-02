import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Wash } from '../washes/entities/wash.entity';
import { CreateWashesDto } from './dto/create-washes.dto';

@Injectable()
export class WashesService {
  constructor(
    @InjectRepository(Wash)
    private washRepository: Repository<Wash>,
    private readonly usersService: UsersService,
  ) {}

  async create(createWashesDto: CreateWashesDto) {
    const user = await this.usersService.findOne(createWashesDto.fk_user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const wash = this.washRepository.create({
      pointsGained: createWashesDto.points_gained,
      userId: createWashesDto.fk_user_id,
      reward: createWashesDto.reward,
      rewardName: createWashesDto.reward_name,
      washLocation: createWashesDto.wash_location,
      washDatetime: new Date(),
    });

    return this.washRepository.save(wash);
  }

  findByUserId(userId: number) {
    return this.washRepository.find({
      where: { user: { id: String(userId) } },
    });
  }
}
