import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from 'src/common/enum';

/**
 * API 异常类。
 *
 * @export
 * @class ApiException
 * @extends {HttpException}
 */
export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiErrorCode;

  constructor(
    errorMessage: string,
    errorCode: ApiErrorCode,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
