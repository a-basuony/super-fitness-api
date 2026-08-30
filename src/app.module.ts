import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { CategoryGroupModule } from './modules/category-group/category-group.module';
import { CategorySegmentModule } from './modules/category-segment/category-segment.module';
import { FoodModule } from './modules/food/food.module';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './common/health.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    MailModule,
    UsersModule,
    OnboardingModule,
    AuthModule,
    CategoryModule,
    CategoryGroupModule,
    CategorySegmentModule,
    WorkoutModule,
    FoodModule,
    AiChatModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
