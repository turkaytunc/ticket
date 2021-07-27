import supertest from 'supertest';
import { app } from '../../app';

it('should fail to signin when email doesnt exist on database', async () => {
  await supertest(app).post('/api/users/signin').send({ email: 'test@gmail.com', password: 'password12' }).expect(400);
});

it('should return 200 status and cookie-session on successful signin', async () => {
  await supertest(app).post('/api/users/signup').send({ email: 'test@gmail.com', password: 'password12' }).expect(201);
  const response = await supertest(app)
    .post('/api/users/signin')
    .send({ email: 'test@gmail.com', password: 'password12' })
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toMatch(/express:sess/);
});

it('should fail to signin when password is incorrect', async () => {
  await supertest(app).post('/api/users/signup').send({ email: 'test@gmail.com', password: 'password12' }).expect(201);
  await supertest(app).post('/api/users/signin').send({ email: 'test@gmail.com', password: 'assword12' }).expect(400);
});
