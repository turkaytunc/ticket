import express, { Request } from 'express';
import { UserPayload } from '../interfaces';
import { currentUser } from '../middlewares';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request & { currentUser?: UserPayload }, res, next) => {
  res.send({ currentUser: req.currentUser });
});

export default router;
