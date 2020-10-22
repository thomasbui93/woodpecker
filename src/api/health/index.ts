import { NextFunction, Request, Response, Router } from 'express'
import healthCheck from '../../services/health'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const components = await healthCheck()
    res.status(200).json(components)
  } catch (err) {
    next(err)
  }
})

export default router
