import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../interfaces';
import { HttpError, NotAuthorizedError } from '../utils';

export const requireAuth = (req: Request & { currentUser?: UserPayload }, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
