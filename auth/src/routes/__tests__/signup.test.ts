import supertest from 'supertest';
import { app } from '../../app';

it('should return 201 status on successful sigup', async () => {
  return supertest(app).post('/api/users/signup').send({ email: 'test@gmail.com', password: 'password12' }).expect(201);
});

it('should return 400 status on invalid email', async () => {
  return supertest(app).post('/api/users/signup').send({ email: 'test', password: 'password123' }).expect(400);
});

it('should return 400 status on invalid password', async () => {
  return supertest(app).post('/api/users/signup').send({ email: 'test@test.com', password: 'pas' }).expect(400);
});

it('should return 400 status on empty email and password', async () => {
  return supertest(app).post('/api/users/signup').send({ email: '', password: '' }).expect(400);
});

it('should return 400 status on duplicate email', async () => {
  await supertest(app).post('/api/users/signup').send({ email: 'test@test.com', password: 'pass123' }).expect(201);
  const response = await supertest(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'pass123' })
    .expect(400);

  expect(response.body.errors[0].message).toBe('User already exists');
});
