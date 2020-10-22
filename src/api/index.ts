import { Express } from 'express'
import healthCheckController from './health'

export default function routes(app: Express) {
  app.use('/z/ping', healthCheckController)
}
