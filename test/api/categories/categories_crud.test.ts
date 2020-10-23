import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';
import { Category } from '../../../src/entity/Category';

describe('api/categories', () => {
  let app: Express;
  let typeId: number | string;
  beforeAll(async () => {
    app = await setupServer();
    const res = await request(app)
      .post('/api/types')
      .send({
        name: 'type1',
        description: 'description type 1',
      });
    typeId = res.body.type.id;
  });

  describe('create endpoint', () => {
    describe('with correct input', () => {
      it('should able to create a category', async () => {
        const res = await request(app)
          .post('/api/categories')
          .send({
            name: 'cat1',
            description: 'cat type 1',
            type: typeId,
          });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('cat');
        expect(res.body.cat).toMatchObject({
          name: 'cat1',
          description: 'cat type 1',
        });
        expect(res.body.cat).toHaveProperty('type');
        expect(res.body.cat.type.id).toBe(typeId);
      });
    });

    describe('with missing description', () => {
      it('should not able to create a category', async () => {
        const res = await request(app)
          .post('/api/categories')
          .send({
            name: 'cat1',
            type: typeId,
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing name', () => {
      it('should not able to create a category', async () => {
        const res = await request(app)
          .post('/api/categories')
          .send({
            description: 'cat1',
            type: typeId,
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing type', () => {
      it('should not able to create a category', async () => {
        const res = await request(app)
          .post('/api/categories')
          .send({
            name: 'cat1',
            description: 'desc1',
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with invalid type', () => {
      it('should not able to create a category', async () => {
        const res = await request(app)
          .post('/api/categories')
          .send({
            name: 'cat1',
            description: 'desc1',
            type: 12345609000,
          });
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('read endpoint', () => {
    describe('with correct id', () => {
      it('should able to get a category', async () => {
        const cat = await request(app)
          .post('/api/categories')
          .send({
            name: 'cat valid',
            description: 'description cat valid',
            type: typeId,
          });
        const catId = cat.body.cat.id;
        const res = await request(app)
          .get(`/api/categories/${catId}`)
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('cat');
        expect(res.body.cat).toMatchObject({
          name: 'cat valid',
          description: 'description cat valid',
        });
        expect(res.body.cat).toHaveProperty('type');
        expect(res.body.cat.type.id).toBe(typeId);
      });
    });

    describe('with invalid id', () => {
      it('should not able to get a category', async () => {
        const res = await request(app)
          .get('/api/categories/1000')
          .send();
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('delete endpoint', () => {
    describe('with correct id', () => {
      it('should able to perform a delete', async () => {
        const cat = await request(app)
          .post('/api/categories/')
          .send({
            name: 'cat1',
            description: 'cat type 1',
            type: typeId,
          });
        const catId = cat.body.cat.id;

        const res = await request(app)
          .del(`/api/categories/${catId}`)
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBeTruthy();
      });
    });

    describe('with invalid id', () => {
      it('should able to perform a delete', async () => {
        const res = await request(app)
          .del('/api/types/1000')
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBeTruthy();
      });
    });
  });

  describe('update endpoint', () => {
    let catId: Category;
    beforeAll(async () => {
      const cat = await request(app)
        .post('/api/categories/')
        .send({
          name: 'cat1',
          description: 'cat type 1',
          type: typeId,
        });
      catId = cat.body.cat.id;
    });
    describe('with correct input', () => {
      it('should able to update a category', async () => {
        const res = await request(app)
          .put(`/api/categories/${catId}`)
          .send({
            name: 'cat2',
            description: 'cat type 2',
            type: typeId,
          });
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('cat');
        expect(res.body.cat).toMatchObject({
          name: 'cat2',
          description: 'cat type 2',
        });
        expect(res.body.cat).toHaveProperty('type');
        expect(res.body.cat.type.id).toBe(typeId);
      });
    });

    describe('with missing description', () => {
      it('should not able to update a category', async () => {
        const res = await request(app)
          .put(`/api/categories/${catId}`)
          .send({
            name: 'cat1',
            type: typeId,
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing name', () => {
      it('should not able to update a category', async () => {
        const res = await request(app)
          .put(`/api/categories/${catId}`)
          .send({
            description: 'cat1',
            type: typeId,
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing type', () => {
      it('should not able to update a category', async () => {
        const res = await request(app)
          .put(`/api/categories/${catId}`)
          .send({
            name: 'cat1',
            description: 'desc1',
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with invalid type', () => {
      it('should not able to update a category', async () => {
        const res = await request(app)
          .put(`/api/categories/${catId}`)
          .send({
            name: 'cat1',
            description: 'desc1',
            type: 12345609000,
          });
        expect(res.status).toEqual(400);
      });
    });
  });
});
