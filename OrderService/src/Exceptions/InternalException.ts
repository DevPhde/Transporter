import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalException extends HttpException {
  constructor(message: string) {
    super({ message, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
