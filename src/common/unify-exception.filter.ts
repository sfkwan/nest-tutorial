import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppconfigService } from 'src/appconfig/appconfig.service';


@Catch(HttpException)
export class UnifyExceptionFilter implements ExceptionFilter {
    private readonly appCode: string;
    constructor(private readonly logger: Logger,
        private configService: AppconfigService){
            this.appCode = configService.getServerConfig().appCode;
        }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const {headers, url} = request;
    const xRequestId = headers['x-request-id'];
    const iMessage = 

    this.logger.error({
       code: status,
       service: request.headers.host + url,
       mesage: exception.message,
       errors: '',
       'x-request-id': xRequestId,
       appCode: this.appCode,
    },exception);
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}