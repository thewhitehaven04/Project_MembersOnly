import mongoose, { model } from 'mongoose'
import { type IUser } from './types'

const UserSchema = new mongoose.Schema<IUser>({
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  data: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    isMember: { type: Boolean, required: true }
  }
})

UserSchema.virtual('data.fullName').get(function () {
  return `${this.data.name} ${this.data.lastName}`
})

const User = model<IUser>('user', UserSchema)

export default User
