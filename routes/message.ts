import { Router } from 'express'
import { deleteMessage, getMessageForm, getMessages, postMessage } from '../controllers/message'

const messageRouter = Router()

messageRouter.get('/', getMessageForm)
messageRouter.post('/', ...postMessage)
messageRouter.get('/show', ...getMessages)
messageRouter.post('/:id/delete', ...deleteMessage)

export default messageRouter
