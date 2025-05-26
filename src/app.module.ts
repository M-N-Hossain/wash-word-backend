import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { LocationsModule } from './modules/locations/locations.module';
import { MockModule } from './modules/mock/mock.module';
import { ProblemsModule } from './modules/problems/problems.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { ServicesModule } from './modules/services/services.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { WashHallsModule } from './modules/wash-halls/wash-halls.module';
import { WashesModule } from './modules/washes/washes.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    MockModule,
    ServicesModule,
    SubscriptionsModule,
    WashHallsModule,
    ProblemsModule,
    FeedbackModule,
    WashesModule,
    RewardsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
