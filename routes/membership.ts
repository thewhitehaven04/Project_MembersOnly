import { Router } from 'express'
import { getMembership, postCheckMembership } from '../controllers/membership'

const membershipRouter = Router()

membershipRouter.get('/', getMembership)
membershipRouter.post('/', postCheckMembership)

export default membershipRouter