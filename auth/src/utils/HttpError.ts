import { ErrorFormatter } from '../interfaces/ErrorFormatter';

export class HttpError extends Error implements ErrorFormatter {
  constructor(public message: string, public field: string, public statusCode: number) {
    super();

    Object.setPrototypeOf(this, HttpError.prototype);
  }
  formatError() {
    return [{ message: this.message, field: this.field }];
  }
}
