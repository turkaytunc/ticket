import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res, next) => {
  try {
    if (!req.session?.jwt) {
      return res.send({ currentUser: null });
    }
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    next(err);
  }
});

export default router;
