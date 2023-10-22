import type passport from 'passport'

export interface IAuthService {
  serialize: (
    user: Express.User,
    done: (err: any, id?: unknown) => void
  ) => void
  deserialize: (
    id: string,
    done: (err: any, user?: false | Express.User | null | undefined) => void
  ) => void
  strategy: passport.Strategy 
  strategyName: string
}
