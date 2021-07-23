import express from 'express';
import cookieSession from 'cookie-session';
import { error404, globalError } from './middlewares';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

// Unhandled Endpoint Error
app.use(error404);

// Global Error Handler
app.use(globalError);

export { app };
