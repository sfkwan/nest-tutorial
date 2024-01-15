import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from './dto/server.config';

@Injectable()
export class AppconfigService {
    constructor(private readonly configService: ConfigService) {}

    getServerConfig(): ServerConfig {
        return this.configService.get<ServerConfig>('server') as ServerConfig;
    }
}
