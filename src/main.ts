import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import helmet from 'helmet';
import { AppconfigService } from './appconfig/appconfig.service';
import { LoggerService } from '@nestjs/common';
import * as os from 'os';
import * as winston from 'winston';
import { EccLog } from './common/ecclog.dto';
import { format } from 'path';
import { WinstonModule } from 'nest-winston';


function initLogger(configService: AppconfigService) : LoggerService {
  const eccConfig = configService.getEccConfig();
  const hostname = os.hostname();
  const {subSource, customer, service, alertKey, alertGroup } = eccConfig;
  const eccFormat = winston.format((info) => {
     const res : EccLog = {
        sub_source: subSource,
        hostname,
        customer,
        service,
        summary: '',
        severity: '',
        alert_key: '',
        alert_group: '',
        level: info.level,
        message: '',
     };

     if(info.level == 'error') {
      res.severity = '5';
     } else {
      res.severity = '3';
     }
     if(!info.summary || info.summary.length <=0) {
      if(!info.message) {
        return false;
      }
      const message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
      res.summary = message.substring(0, 255);
     }

     res.alert_key = info.alert_key ?? alertKey;
     res.alert_group = info.alert_group ?? alertGroup;
     
     return res;
  });

  const instance = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.Http({
        level: eccConfig.level,
        host: eccConfig.remoteHost,
        port: eccConfig.remotePort,
        path: eccConfig.remotePath,
        ssl: eccConfig.remoteSsl,
        format: winston.format.combine(eccFormat(), winston.format.json()),
      }),
    ],
  });

  return WinstonModule.createLogger({instance});
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(AppconfigService);

  app.useLogger(initLogger(configService));
  app.use(helmet());
  app.enableCors({origin: configService.getServerConfig().corsDomain});

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  const config = new DocumentBuilder()
    .setTitle('Nest-Api')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  
  await app.listen(configService.getServerConfig().port);
}
bootstrap();
