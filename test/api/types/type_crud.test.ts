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
});
