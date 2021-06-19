import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { HttpError, RequestValidationError } from '../utils';

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

      console.log('User created!');

      return res.send({});
    } catch (err) {
      next(err);
    }
  }
);

export default router;
