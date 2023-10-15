import { type ISignUpRequest } from '../controllers/singUp/types'
import User from '../models/user'
import { type IUser } from '../models/user/types'
import { hashPassword } from '../utils/passwordEncrypt'
import { type Types, type Document } from 'mongoose'

async function createRegularUser (
  userCreateRequest: ISignUpRequest
): Promise<
  Document<unknown, Record<string, unknown>, IUser> &
  IUser & { _id: Types.ObjectId }
  > {
  const { name, lastName, username, password } = userCreateRequest
  const user = {
    credentials: {
      username,
      password: await hashPassword(password)
    },
    data: {
      name,
      lastName,
      isMember: false,
      isAdmin: false
    }
  }
  const userModel = new User(user)
  await userModel.save()
  return userModel
}

export { createRegularUser }
