import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppconfigModule } from './appconfig/appconfig.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { UnifyExceptionFilter } from './common/unify-exception.filter';

@Module({
  imports: [AppconfigModule, PrismaModule, ArticlesModule, UsersModule, AuthModule,
    WinstonModule.forRoot({
      transports: [new transports.Console]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, JwtService, Logger,
    {
      provide: APP_FILTER,
      useClass: UnifyExceptionFilter,
    }
  ],
})
export class AppModule {}
