import request from 'supertest';
import { app, client } from './server';

beforeAll(() => client.connect());

afterAll(() => client.end());

describe('app', () => {
  test('GET /home', async () => {
    await request(app).get('/')
      .expect(200);
  });
  test('POST /person/:id/skill/:id', async () => {
    await request(app).post('/person/1/skill/1')
      .send({ experience: 3 })
      .expect(200)
      .expect({ experience: 3 });
  });
  test.skip('POST /person/:id/skill/:id with invalid id', async () => {
    await request(app).post('/person/12341234/skill/1')
      .send({ experience: 3 })
      .expect(400);
  });
  test.skip('POST /person/:id/skill/:id with invalid data', async () => {
    await request(app).post('/person/1/skill/1')
      .send({ invalid_field: 3 })
      .expect(400);
  });
});
