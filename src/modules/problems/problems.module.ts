import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  exports: [TypeOrmModule],
})
export class ProblemsModule {}
