import Message from '../../models/message'
import { type IMessage } from '../../models/message/types'
import { type IUser } from '../../models/user/types'
import { type PopulatedMessageDocument } from './types'

async function storeMessage(message: IMessage): Promise<void> {
  await Message.create(message)
}

async function getMessages(count: number): Promise<PopulatedMessageDocument[]> {
  return await Message.find({})
    .populate<{ author: IUser }>('author')
    .limit(count)
    .exec()
}

async function deleteMessage(id: string): Promise<void> {
  await Message.findByIdAndDelete(id).exec()
}

export { storeMessage, getMessages, deleteMessage }
