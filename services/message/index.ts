import {
  type IMessageView,
  type INewMessageRequest
} from '../../controllers/message/types'
import { type IMessage } from '../../models/message/types'
import { getMessages, storeMessage } from '../../repository/message'
import { getUserById } from '../../repository/user'
import { formatRelative } from 'date-fns'

async function saveMessage(
  message: INewMessageRequest,
  user: Express.User
): Promise<void> {
  const author = await getUserById(user._id)

  if (author !== null) {
    const messageToSave: IMessage = {
      title: message.title,
      text: message.text,
      timestamp: new Date(),
      author: author._id
    }
    await storeMessage(messageToSave)
  }
}

async function getFormattedMessages(count: number): Promise<IMessageView[]> {
  const messages = await getMessages(count)
  return messages.map((msg) => {
    return {
      title: msg.title,
      text: msg.text,
      author: msg.author.data.name + ' ' + msg.author.data.lastName,
      timestamp: formatRelative(msg.timestamp, new Date())
    }
  })
}

export { saveMessage, getFormattedMessages }
