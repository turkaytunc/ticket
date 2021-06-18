import express from 'express';

const router = express.Router();

router.post('/api/users/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    next(err);
  }
});

export default router;
