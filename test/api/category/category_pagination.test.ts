import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';

describe('api/categories pagination', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupServer();
    const res = await request(app)
      .post('/api/types')
      .send({
        name: 'type1',
        description: 'description type 1',
      });
    const typeId = res.body.type.id;
    const seeds = [...Array(21).keys()].map((key) => ({
      name: `name_${key}`,
      description: `description_${key}`,
      type: typeId,
    })).map((doc) => request(app)
      .post('/api/categories')
      .send(doc));
    await Promise.all(seeds);
  });

  describe('missing both page and size in query', () => {
    it('should show 10 categories', async () => {
      const res = await request(app)
        .get('/api/categories')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('cats');
      const { cats } = res.body;
      expect(cats.length).toBe(10);
    });
  });

  describe('missing page in query', () => {
    it('should show 20 categories', async () => {
      const res = await request(app)
        .get('/api/categories?size=20')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('cats');
      const { cats } = res.body;
      expect(cats.length).toBe(20);
    });
  });

  describe('missing size in query', () => {
    it('should show 10 categories', async () => {
      const res = await request(app)
        .get('/api/categories?page=1')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('cats');
      const { cats } = res.body;
      expect(cats.length).toBe(10);
    });
  });

  describe('invalid page in query', () => {
    it('should show 0 categories', async () => {
      const res = await request(app)
        .get('/api/categories?page=1000')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('cats');
      const { cats } = res.body;
      expect(cats.length).toBe(0);
    });
  });

  describe('both page and size are present', () => {
    it('should show correct result', async () => {
      const res = await request(app)
        .get('/api/categories?page=1&size=5')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('cats');
      const { cats } = res.body;
      expect(cats.length).toBe(5);
    });
  });
});
