import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['subscription'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['subscription'],
    });
  }

  async updateSubscription(
    userId: string,
    subscriptionId: string,
  ): Promise<User> {
    // First, update the user's subscription directly using a query
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ subscriptionId: subscriptionId })
      .where('id = :userId', { userId })
      .execute();

    // Then fetch the fresh user data with the updated subscription
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscription'],
    });
  }

  // async getSubscriptionDetails(userId: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: [
  //       'subscription',
  //       'subscription.subscriptionServices',
  //       'subscription.subscriptionServices.service',
  //     ],
  //   });

  //   return user?.subscription;
  // }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
