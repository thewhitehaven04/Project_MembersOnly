import { Schema, model } from 'mongoose'
import { type IMembership } from './types'

const MembershipKeysSchema = new Schema<IMembership>({
  key: { type: 'string', required: true }
})

const MembershipKeys = model('membership', MembershipKeysSchema)

export default MembershipKeys
