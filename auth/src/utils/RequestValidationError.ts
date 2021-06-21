import { ValidationError } from 'express-validator';
import { ErrorFormatter } from '../interfaces/ErrorFormatter';

export class RequestValidationError extends Error implements ErrorFormatter {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super();

    // have to use this if transpile to es2015 or before
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  formatError() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
