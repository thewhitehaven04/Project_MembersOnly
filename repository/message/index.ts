import Message from '../../models/message'
import { type IMessage } from '../../models/message/types'
import { type IUser } from '../../models/user/types'
import { type PopulatedMessageDocument } from './types'

async function storeMessage(message: IMessage): Promise<void> {
  const msg = new Message(message)
  await msg.save()
}

async function getMessages(count: number): Promise<PopulatedMessageDocument[]> {
  return await Message.find({})
    .populate<{ author: IUser }>('author')
    .limit(count)
    .exec()
}

export { storeMessage, getMessages }
