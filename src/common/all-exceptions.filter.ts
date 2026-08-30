import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(res.message)) {
          message = res.message.join(', ');
        } else if (typeof res.message === 'string') {
          message = res.message;
        } else {
          message = exception.message;
        }
      }

      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    const logMessage = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      status,
      message,
      ...(process.env.NODE_ENV !== 'production' && stack && { stack }),
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(JSON.stringify(logMessage), stack);
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(JSON.stringify(logMessage));
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      ...(process.env.NODE_ENV !== 'production' && { timestamp: logMessage.timestamp }),
    });
  }
}
