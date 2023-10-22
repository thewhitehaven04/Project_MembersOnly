import User from '../../models/user/'
import { type IUser } from '../../models/user/types'
import { type UserDocument } from './types'

async function createUser(user: IUser): Promise<void> {
  const newUser = new User(user)
  await newUser.save()
}

async function getUserByName(username: string): Promise<UserDocument | null> {
  return await User.findOne({ 'credentials.username': username }).exec()
}

async function getUserById(id: string): Promise<UserDocument | null> {
  return await User.findById(id).exec()
}

async function setUserMembership(id: string): Promise<void> {
  await User.findByIdAndUpdate(id, { $set: { 'data.isMember': true } })
}

export { createUser, getUserById, getUserByName, setUserMembership }
