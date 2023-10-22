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

async function _isUserMember(user: Express.User): Promise<boolean> {
  const userOrNull = await getUserById(user._id)
  if (userOrNull != null) {
    return user.isMember
  }
  return false
}

async function getFormattedMessages(
  count: number,
  user: Express.User
): Promise<IMessageView[]> {
  const messages = await getMessages(count)

  const isMember = await _isUserMember(user)

  return messages.map((msg) => {
    return {
      title: msg.title,
      text: msg.text,
      author: isMember
        ? msg.author.data.name + ' ' + msg.author.data.lastName
        : 'Anonymous',
      timestamp: isMember ? formatRelative(msg.timestamp, new Date()) : ''
    }
  })
}

export { saveMessage, getFormattedMessages }
