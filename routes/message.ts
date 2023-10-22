import { Router } from 'express'
import { getMessageForm, getMessages, postMessage } from '../controllers/message'

const messageRouter = Router()

messageRouter.get('/', getMessageForm)
messageRouter.post('/', ...postMessage)
messageRouter.get('/show', ...getMessages)

export default messageRouter
