import supertest from 'supertest';
import { app } from '../../app';

it('should signout and return signed out message', async () => {
  await supertest(app).post('/api/users/signup').send({ email: 'test@gmail.com', password: 'password12' }).expect(201);
  await supertest(app).post('/api/users/signin').send({ email: 'test@gmail.com', password: 'password12' }).expect(200);

  const response = await supertest(app).post('/api/users/signout').expect(200);

  expect(response.body.message).toBe('Signed out!');
});
