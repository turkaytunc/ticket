import { ErrorFormatter } from '../interfaces/ErrorFormatter';

export class HttpError extends Error implements ErrorFormatter {
  constructor(public message: string, public statusCode: number, public field?: string) {
    super();

    Object.setPrototypeOf(this, HttpError.prototype);
  }
  formatError() {
    return [{ message: this.message }];
  }
}
