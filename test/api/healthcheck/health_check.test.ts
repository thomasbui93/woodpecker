import request from 'supertest'
import setupServer from '../../../src/bootstrap/server'

describe('health check', () => {
  it('should fetch health check', async () => {
    const app = setupServer()
    const res = await request(app)
      .get('/z/ping')
      .send()
    expect(res.status).toEqual(200)
    expect(res.body.length).toEqual(1)
    expect(res.body[0]).toMatchObject({
      name: 'sql',
      status: true
    })
  })
})
