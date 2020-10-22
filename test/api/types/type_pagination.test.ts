import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';

describe('api/types pagination', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupServer();
    const seeds = [...Array(21).keys()].map((key) => ({
      name: `name_${key}`,
      description: `description_${key}`,
    })).map((doc) => request(app)
      .post('/api/types')
      .send(doc));
    await Promise.all(seeds);
  });

  describe('missing both page and size in query', () => {
    it('should show 10 types', async () => {
      const res = await request(app)
        .get('/api/types')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('types');
      const { types } = res.body;
      expect(types.length).toBe(10);
    });
  });

  describe('missing page in query', () => {
    it('should show 20 types', async () => {
      const res = await request(app)
        .get('/api/types?size=20')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('types');
      const { types } = res.body;
      expect(types.length).toBe(20);
    });
  });

  describe('missing size in query', () => {
    it('should show 10 types', async () => {
      const res = await request(app)
        .get('/api/types?page=1')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('types');
      const { types } = res.body;
      expect(types.length).toBe(10);
    });
  });

  describe('invalid page in query', () => {
    it('should show 0 types', async () => {
      const res = await request(app)
        .get('/api/types?page=1000')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('types');
      const { types } = res.body;
      expect(types.length).toBe(0);
    });
  });

  describe('both page and size are present', () => {
    it('should show correct result', async () => {
      const res = await request(app)
        .get('/api/types?page=1&size=5')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('types');
      const { types } = res.body;
      expect(types.length).toBe(5);
    });
  });
});
