import { NextFunction, Request, Response } from 'express';
import { ErrorFormatter } from '../interfaces/ErrorFormatter';

const globalError = (error: Error & ErrorFormatter, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.formatError) {
    return res.status(error.statusCode).json({ errors: error.formatError() });
  }

  return res.status(500).json({
    message: error.message || 'An unexpected error occurred',
  });
};

export default globalError;
