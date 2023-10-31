import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super({ message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
  }
}
