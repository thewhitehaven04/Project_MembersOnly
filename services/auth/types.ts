import { type Middleware } from 'express-validator/src/base'

export interface IAuthService {
  getMiddleware: ({
    successRedirect,
    failureRedirect
  }: {
    successRedirect: string
    failureRedirect: string
  }) => Middleware
}
