import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { MockModule } from './modules/mock/mock.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { WashesModule } from './modules/washes/washes.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    MockModule,
    SubscriptionsModule,
    FeedbackModule,
    WashesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
