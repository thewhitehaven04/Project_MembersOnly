import mongoose, { Schema, model } from 'mongoose'
import { type IMessage } from './types'

const MessageSchema = new mongoose.Schema<IMessage>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

const Message = model<IMessage>('message', MessageSchema)

export default Message
