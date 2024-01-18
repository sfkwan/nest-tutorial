import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from './dto/server.config';
import { EccConfig } from './dto/ecc.config';

@Injectable()
export class AppconfigService {
    constructor(private readonly configService: ConfigService) {}

    getServerConfig(): ServerConfig {
        return this.configService.get<ServerConfig>('server') as ServerConfig;
    }

    getEccConfig(): EccConfig {
        return this.configService.get<EccConfig>('ecc') as EccConfig;
    }
}
