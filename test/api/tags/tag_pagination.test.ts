import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';

describe('api/tags pagination', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupServer();
    const seeds = [...Array(21).keys()].map((key) => ({
      name: `name_${key}`,
      description: `description_${key}`,
    })).map((doc) => request(app)
      .post('/api/tags')
      .send(doc));
    await Promise.all(seeds);
  });

  describe('missing both page and size in query', () => {
    it('should show 10 tags', async () => {
      const res = await request(app)
        .get('/api/tags')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('tags');
      const { tags } = res.body;
      expect(tags.length).toBe(10);
    });
  });

  describe('missing page in query', () => {
    it('should show 20 tags', async () => {
      const res = await request(app)
        .get('/api/tags?size=20')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('tags');
      const { tags } = res.body;
      expect(tags.length).toBe(20);
    });
  });

  describe('missing size in query', () => {
    it('should show 10 tags', async () => {
      const res = await request(app)
        .get('/api/tags?page=1')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('tags');
      const { tags } = res.body;
      expect(tags.length).toBe(10);
    });
  });

  describe('invalid page in query', () => {
    it('should show 0 tags', async () => {
      const res = await request(app)
        .get('/api/tags?page=1000')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('tags');
      const { tags } = res.body;
      expect(tags.length).toBe(0);
    });
  });

  describe('both page and size are present', () => {
    it('should show correct result', async () => {
      const res = await request(app)
        .get('/api/tags?page=1&size=5')
        .send();
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('tags');
      const { tags } = res.body;
      expect(tags.length).toBe(5);
    });
  });
});
