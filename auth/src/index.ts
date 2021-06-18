import express from 'express';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.listen(3000, () => {
  console.log('Auth Service => http://localhost:3000');
});
