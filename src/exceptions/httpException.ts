import { ErrorCodes, ErrorEnum } from './errorCodes';

export class HttpException extends Error {
  public status: number;

  constructor(errorEnum: ErrorEnum, ...params: unknown[]) {
    const error = ErrorCodes[errorEnum];
    let message = error.message;
    for (const p of params) {
      message = message.replace('%s', p as string);
    }

    super(message);
    this.status = error.status;
  }
}
