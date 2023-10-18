import {
  type AuthenticateOptions,
  type Authenticator,
  type DeserializeUserFunction,
  type Strategy
} from 'passport'
import { type Handler } from 'express'
import { type IAuthService } from './types'
import { type Middleware } from 'express-validator/src/base'

class AuthService implements IAuthService {
  passport: Authenticator<Handler, any, any, AuthenticateOptions>
  strategy: string

  constructor(
    passport: Authenticator<Handler, any, any, AuthenticateOptions>,
    strategy: { name: string; cb: Strategy },
    serializeCb: (
      user: Express.User,
      done: (err: any, id?: unknown) => void
    ) => void,
    deserializeCb: DeserializeUserFunction
  ) {
    this.passport = passport
    const { cb, name } = strategy
    this.passport.use(cb)
    this.passport.serializeUser(serializeCb)
    this.passport.deserializeUser(deserializeCb)
    this.strategy = name
  }

  getMiddleware({
    successRedirect,
    failureRedirect
  }: {
    successRedirect: string
    failureRedirect: string
  }): Middleware {
    return (req, res, next) => {
      this.passport.authenticate(this.strategy, {
        successRedirect,
        failureRedirect
      })
      next()
    }
  }
}

export default AuthService
