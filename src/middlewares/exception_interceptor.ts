import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/logger'
const log = logger.child({
  name: 'exceptionInterceptor'
})

const getStatus = (err: Error): number => {
  switch (err.name) {
    case 'SystemUserCreateException':
    case 'SystemUserRemovalException':
    case 'SystemUserSearchFailed':
    case 'DeactivateUserFailure':
      return 400
    case 'SystemUserAuthenticationFailed':
    case 'NormalUserAuthenticationFailed':
    case 'TokenAuthenticationException':
    case 'AdminAuthenticationFailure':
    case 'ChangePasswordFailure':
      return 401
    default:
      return 500
  }
}

export default function exceptionInterceptor(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }

  log.error({
    request: req.url,
    method: req.method,
    body: req.body,
    stack: err.stack,
  }, 'Uncaught exception.')

  return res.status(getStatus(err)).send({
    error: true,
    message: err.message,
  })
}
