import expressAsyncHandler from 'express-async-handler'
import redirectToLoginFormIfNotAuthenticated from '../../middleware/auth'
import { type Request } from 'express'
import { type IInvalidKeyMessageView, type IMembershipRequest } from './types'
import * as UserService from './../../services/user'
import type ViewResponse from '../types/ViewResponse'

const getMembership = [
  redirectToLoginFormIfNotAuthenticated,
  expressAsyncHandler(
    async (req, res: ViewResponse<IInvalidKeyMessageView>, next) => {
      if (req.user != null) {
        res.render('membership', { data: { isValid: true } })
      }
    }
  )
]

const postCheckMembership = [
  redirectToLoginFormIfNotAuthenticated,
  expressAsyncHandler(
    async (
      req: Request<any, any, IMembershipRequest, any>,
      res: ViewResponse<IInvalidKeyMessageView>
    ) => {
      if (req.user != null) {
        const isMember = await UserService.setUserMembershipIfValidKey(
          req.body,
          req.user
        )
        if (!isMember) {
          res.render('membership', { data: { isValid: false } })
          return
        }
        res.redirect('/')
      }
    }
  )
]

export { getMembership, postCheckMembership }
