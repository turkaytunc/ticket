import express from 'express';
import cookieSession from 'cookie-session';
import { error404, globalError } from './middlewares';
import mongoose from 'mongoose';

import { currentUserRouter, signinRouter, signoutRouter, signupRouter } from './routes';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Auth Service => http://localhost:3000');
  });
};

startServer();
