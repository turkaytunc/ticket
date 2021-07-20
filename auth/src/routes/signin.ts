import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares';
import { User } from '../models';
import { HttpError, PasswordManager } from '../utils';
import { NextFunction } from 'express-serve-static-core';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({ email });
      if (!userFound) {
        throw new HttpError('Credentials not correct', 400);
      }

      const isPasswordCorrect = await PasswordManager.compare(userFound.password, password);

      if (!isPasswordCorrect) {
        throw new HttpError('Invalid Credentials', 400);
      }

      const userJwt = jwt.sign({ id: userFound.id, email: userFound.email }, process.env.JWT_KEY!);
      req.session = { jwt: userJwt };
      return res.json({ userFound });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
