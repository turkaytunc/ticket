import supertest from 'supertest';
import { app } from '../../app';

it('should return current user credentials when user signed in', async () => {
  const cookie = await global.signin();

  const res = await supertest(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({ email: 'test@test.com', password: 'pass123' })
    .expect(200);

  expect(res.body.currentUser).toHaveProperty('iat');
});

it('should return null user when user not signed in or session cookie not provided', async () => {
  const res = await supertest(app)
    .get('/api/users/currentuser')
    .send({ email: 'test@test.com', password: 'pass123' })
    .expect(200);

  expect(res.body.currentUser).toBe(null);
});
