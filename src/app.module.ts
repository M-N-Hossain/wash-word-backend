import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MockModule } from './modules/mock/mock.module';
import { WashModule } from './modules/wash/wash.module';
import { FeedbackModule } from './modules/feedback/feedback.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    MockModule,
    WashModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
