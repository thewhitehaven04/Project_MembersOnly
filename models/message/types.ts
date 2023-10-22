import { type Types } from 'mongoose'

export interface IMessage {
  title: string
  text: string
  timestamp: Date
  author: Types.ObjectId 
}
