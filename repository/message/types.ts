import { type IMessage } from '../../models/message/types'
import { type Document, type Types } from 'mongoose'
import { type IUser } from '../../models/user/types'

export type PopulatedMessageDocument = Omit<
  Document<unknown, Record<string, unknown>, IMessage> &
    IMessage & {
      _id: Types.ObjectId
    },
  'author'
> & {
  author: IUser
}
