import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // have to use this if transpile to before es2015
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
