import { type Types, type Document } from 'mongoose'
import { type IUser } from '../../models/user/types'

export type UserDocument = Document<unknown, Record<string, unknown>, IUser> &
  IUser & { _id: Types.ObjectId }
