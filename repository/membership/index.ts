import MembershipKeys from '../../models/membership'
import { type IMembership } from '../../models/membership/types'

async function checkIfInMembershipKeys(membershipKey: IMembership): Promise<boolean> {
  return await MembershipKeys.findOne(membershipKey).exec() !== null
}

export { checkIfInMembershipKeys }
