import { plainToInstance } from 'class-transformer';
import {IsBoolean, IsNumber, IsString, validateSync} from 'class-validator';

class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsString()
    CONTEXT_PATH: string;

    @IsString()
    CORS_DOMAIN: string;

    @IsString()
    ECC_SUB_SOURCE: string;

    @IsString()
    ECC_CUSTOMER: string;

    @IsString()
    ECC_SERVICE: string;

    @IsString()
    ECC_ALERT_KEY: string;

    @IsString()
    ECC_ALERT_GROUP: string;

    @IsString()
    ECC_LEVEL: string;

    @IsString()
    ECC_REMOTE_HOST: string;

    @IsNumber()
    ECC_REMOTE_PORT: number;

    @IsString()
    ECC_REMOTE_PATH: string;

    @IsBoolean()
    ECC_REMOTE_SSL: boolean;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
      EnvironmentVariables,
      config,
      { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }

