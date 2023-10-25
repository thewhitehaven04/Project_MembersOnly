import { type IMembershipRequest } from '../../controllers/membership/types'
import { type ISignUpRequest } from '../../controllers/signUp/types'
import { checkIfInMembershipKeys } from '../../repository/membership'
import { createUser, setUserMembership } from '../../repository/user'
import { hashPassword } from '../../utils/passwordEncrypt'

async function createRegularUser(
  userCreateRequest: ISignUpRequest
): Promise<void> {
  const { name, lastName, username, password, adminRights } = userCreateRequest
  const user = {
    credentials: {
      username,
      password: await hashPassword(password)
    },
    data: {
      name,
      lastName,
      isMember: false,
      isAdmin: adminRights === 'on'
    }
  }

  await createUser(user)
}

async function setUserMembershipIfValidKey(
  membershipRequest: IMembershipRequest,
  user: Express.User
): Promise<boolean> {
  const membershipKeyIsValid = await checkIfInMembershipKeys(membershipRequest)
  if (membershipKeyIsValid) {
    await setUserMembership(user._id)
    return true
  }
  return false
}

async function isUserMember(user: Express.User): Promise<boolean> {
  return user.isMember
}

async function isUserAdmin(user: Express.User): Promise<boolean> {
  return user.isAdmin
}

export {
  createRegularUser,
  setUserMembershipIfValidKey,
  isUserAdmin,
  isUserMember
}
