import {
  type IMessageView,
  type INewMessageRequest
} from '../../controllers/message/types'
import { type IMessage } from '../../models/message/types'
import * as MessageRepository from '../../repository/message'
import { getUserById } from '../../repository/user'
import { formatRelative } from 'date-fns'
import * as UserService from './../user'

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
    await MessageRepository.storeMessage(messageToSave)
  } else {
    throw new Error('Author has not been found in the database')
  }
}

async function getFormattedMessages(
  count: number,
  user: Express.User
): Promise<IMessageView[]> {
  const messages = await MessageRepository.getMessages(count)

  const canSeeMessages =
    (await UserService.isUserMember(user)) ||
    (await UserService.isUserAdmin(user))

  return messages.map((msg) => {
    return {
      id: msg.id,
      title: msg.title,
      text: msg.text,
      author: canSeeMessages
        ? msg.author.data.name + ' ' + msg.author.data.lastName
        : 'Anonymous',
      timestamp: canSeeMessages ? formatRelative(msg.timestamp, new Date()) : ''
    }
  })
}

async function deleteMessage(id: string, user: Express.User): Promise<void> {
  const isAdmin = await UserService.isUserAdmin(user)
  if (isAdmin) {
    await MessageRepository.deleteMessage(id)
  } else throw new Error('User has no admin access')
}

export { saveMessage, getFormattedMessages, deleteMessage }
