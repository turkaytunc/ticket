import express from 'express';

const app = express();

app.use(express.json());

app.get('api/users/currentuser', (req, res) => {
  res.send('Hello from express');
});

app.listen(3000, () => {
  console.log('Auth Service => http://localhost:3000');
});
