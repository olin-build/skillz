import request from 'supertest';
import { app, client, getRealAddress } from './server';

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

describe(getRealAddress, () => {
  test('reads x-real-ip', () => {
    expect(getRealAddress({ headers: { 'x-real-ip': '8.8.8.8' } })).toBe('8.8.8.8');
  });
  test('reads x-forwarded-for', () => {
    expect(getRealAddress({ headers: { 'x-forwarded-for': '8.8.8.8' } })).toBe('8.8.8.8');
  });
  test('returns the last value from a list of IPs', () => {
    expect(getRealAddress({ headers: { 'x-forwarded-for': '4.4.4.4, 8.8.8.8' } })).toBe('8.8.8.8');
  });
  test('return connection address when no headers are present', () => {
    expect(getRealAddress({ headers: {}, connection: { remoteAddress: '8.8.8.8' } })).toBe('8.8.8.8');
  });
  test('prefers header address over the connection address', () => {
    expect(getRealAddress({ headers: { 'x-real-ip': '8.8.8.8' }, connection: { remoteAddress: '4.4.4.4' } })).toBe('8.8.8.8');
  });
});
