import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';

describe('api/types', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupServer();
  });

  describe('create endpoint', () => {
    describe('with correct input', () => {
      it('should able to create a type', async () => {
        const res = await request(app)
          .post('/api/types')
          .send({
            name: 'type1',
            description: 'description type 1',
          });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toMatchObject({
          name: 'type1',
          description: 'description type 1',
        });
      });
    });

    describe('with missing name input', () => {
      it('should not able to create a type', async () => {
        const res = await request(app)
          .post('/api/types')
          .send({
            description: 'description type 1',
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing description input', () => {
      it('should not able to create a type', async () => {
        const res = await request(app)
          .post('/api/types')
          .send({
            name: 'type 2',
          });
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('read endpoint', () => {
    describe('with correct id', () => {
      it('should able to get a type', async () => {
        const type = await request(app)
          .post('/api/types/')
          .send({
            name: 'type1',
            description: 'description type 1',
          });
        const typeId = type.body.type.id;

        const res = await request(app)
          .get(`/api/types/${typeId}`)
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toMatchObject({
          name: 'type1',
          description: 'description type 1',
        });
      });
    });

    describe('with invalid id', () => {
      it('should able to get a type', async () => {
        const res = await request(app)
          .get('/api/types/1000')
          .send();
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('delete endpoint', () => {
    describe('with correct id', () => {
      it('should able to perform a delete', async () => {
        const type = await request(app)
          .post('/api/types/')
          .send({
            name: 'type2',
            description: 'description type 2',
          });
        const typeId = type.body.type.id;

        const res = await request(app)
          .del(`/api/types/${typeId}`)
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
    describe('with correct id', () => {
      it('should able to update a type', async () => {
        const type = await request(app)
          .post('/api/types/')
          .send({
            name: 'type1',
            description: 'description type 1',
          });
        const typeId = type.body.type.id;

        const res = await request(app)
          .put(`/api/types/${typeId}`)
          .send({
            name: 'type2',
            description: 'description type 2',
          });
        expect(res.status).toEqual(200);

        const resGet = await request(app)
          .get(`/api/types/${typeId}`)
          .send();
        expect(resGet.status).toEqual(200);
        expect(resGet.body).toHaveProperty('type');
        expect(resGet.body.type).toMatchObject({
          name: 'type2',
          description: 'description type 2',
        });
      });
    });

    describe('with invalid id', () => {
      it('should not able to update a type', async () => {
        const res = await request(app)
          .put('/api/types/1000')
          .send({
            name: 'type2',
            description: 'description type 2',
          });
        expect(res.status).toEqual(404);
      });
    });
  });
});
