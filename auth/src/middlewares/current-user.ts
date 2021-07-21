import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export const currentUser = (req: Request & { currentUser?: UserPayload }, res: Response, next: NextFunction) => {
  try {
    if (!req.session?.jwt) {
      return next();
    }
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
    return next();
  } catch (err) {
    return next(err);
  }
};
