import { ErrorFormatter } from '../interfaces/ErrorFormatter';

export class NotAuthorizedError extends Error implements ErrorFormatter {
  statusCode = 400;
  constructor(public field?: string) {
    super();
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  formatError() {
    return [{ message: 'UnAuthorized' }];
  }
}
