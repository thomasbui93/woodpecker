import { Express } from 'express';
import request from 'supertest';
import setupServer from '../../../src/bootstrap/server';

describe('api/tags', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupServer();
  });

  describe('create endpoint', () => {
    describe('with correct input', () => {
      it('should able to create a tag', async () => {
        const res = await request(app)
          .post('/api/tags')
          .send({
            name: 'tag1',
            description: 'description tag 1',
          });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('tag');
        expect(res.body.tag).toMatchObject({
          name: 'tag1',
          description: 'description tag 1',
        });
      });
    });

    describe('with missing name input', () => {
      it('should not able to create a tag', async () => {
        const res = await request(app)
          .post('/api/tags')
          .send({
            description: 'description tag 1',
          });
        expect(res.status).toEqual(400);
      });
    });

    describe('with missing description input', () => {
      it('should not able to create a tag', async () => {
        const res = await request(app)
          .post('/api/tags')
          .send({
            name: 'tag 2',
          });
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('read endpoint', () => {
    describe('with correct id', () => {
      it('should able to get a tag', async () => {
        const tag = await request(app)
          .post('/api/tags/')
          .send({
            name: 'tag1',
            description: 'description tag 1',
          });
        const tagId = tag.body.tag.id;

        const res = await request(app)
          .get(`/api/tags/${tagId}`)
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('tag');
        expect(res.body.tag).toMatchObject({
          name: 'tag1',
          description: 'description tag 1',
        });
      });
    });

    describe('with invalid id', () => {
      it('should able to get a tag', async () => {
        const res = await request(app)
          .get('/api/tags/1000')
          .send();
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('delete endpoint', () => {
    describe('with correct id', () => {
      it('should able to perform a delete', async () => {
        const tag = await request(app)
          .post('/api/tags/')
          .send({
            name: 'tag2',
            description: 'description tag 2',
          });
        const tagId = tag.body.tag.id;

        const res = await request(app)
          .del(`/api/tags/${tagId}`)
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBeTruthy();
      });
    });

    describe('with invalid id', () => {
      it('should able to perform a delete', async () => {
        const res = await request(app)
          .del('/api/tags/1000')
          .send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBeTruthy();
      });
    });
  });

  describe('update endpoint', () => {
    describe('with correct id', () => {
      it('should able to update a tag', async () => {
        const tag = await request(app)
          .post('/api/tags/')
          .send({
            name: 'tag1',
            description: 'description tag 1',
          });
        const tagId = tag.body.tag.id;

        const res = await request(app)
          .put(`/api/tags/${tagId}`)
          .send({
            name: 'tag2',
            description: 'description tag 2',
          });
        expect(res.status).toEqual(200);

        const resGet = await request(app)
          .get(`/api/tags/${tagId}`)
          .send();
        expect(resGet.status).toEqual(200);
        expect(resGet.body).toHaveProperty('tag');
        expect(resGet.body.tag).toMatchObject({
          name: 'tag2',
          description: 'description tag 2',
        });
      });
    });

    describe('with invalid id', () => {
      it('should not able to update a tag', async () => {
        const res = await request(app)
          .put('/api/tags/1000')
          .send({
            name: 'tag2',
            description: 'description tag 2',
          });
        expect(res.status).toEqual(404);
      });
    });
  });
});
