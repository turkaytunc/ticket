import express from 'express';
import { error404, globalError } from './middlewares';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

// Unhandled Endpoint Error
app.use(error404);

// Global Error Handler
app.use(globalError);

app.listen(3000, () => {
  console.log('Auth Service => http://localhost:3000');
});
