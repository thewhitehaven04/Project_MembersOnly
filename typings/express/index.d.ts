import { type IUserData } from '../../models/user/types'

declare global {
  namespace Express {
    export interface User extends IUserData {
      _id: string
    }
  }
}
