import { Global, Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validate } from './env.validation';

@Global()
@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    expandVariables: true,
    load: [configuration],
    validate,
  }),
],
  providers: [AppconfigService],
  exports: [AppconfigService],
})
export class AppconfigModule {}
