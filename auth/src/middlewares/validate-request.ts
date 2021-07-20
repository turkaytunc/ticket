import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../utils';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
