import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models';
import { HttpError, RequestValidationError } from '../utils';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      const { email, password } = req.body;

      const isUserExists = await User.findOne({ email });
      if (isUserExists) {
        throw new HttpError('User already exists', 400);
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
      req.session = { jwt: userJwt };
      return res.json({ user });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
