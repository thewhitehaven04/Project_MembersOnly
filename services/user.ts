import { type ISignUpRequest } from '../controllers/signUp/types'
import { createUser } from '../repository/user'
import { hashPassword } from '../utils/passwordEncrypt'

async function createRegularUser(
  userCreateRequest: ISignUpRequest
): Promise<void> {
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

  await createUser(user)
}

export { createRegularUser }
