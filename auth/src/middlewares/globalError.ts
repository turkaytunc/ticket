import { NextFunction, Request, Response } from 'express';
import { HttpError, RequestValidationError } from '../utils';

const globalError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  if (error instanceof RequestValidationError) {
    const formatErrors = error.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });

    return res.status(400).json({ errors: formatErrors });
  }

  return res.status(500).json({
    message: error.message || 'An unexpected error occurred',
  });
};

export default globalError;
