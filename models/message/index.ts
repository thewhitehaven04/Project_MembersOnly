import mongoose, { model } from 'mongoose'
import { type IMessage } from './types'

const MessageSchema = new mongoose.Schema<IMessage>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: String, required: true }
})

const MessageModel = model<IMessage>('message', MessageSchema)

export default MessageModel
