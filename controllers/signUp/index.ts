import expressAsyncHandler from 'express-async-handler'
import type { Request } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import userValidator from '../../models/user/validation'
import { type ISignUpUpdateView, type ISignUpRequest } from './types'
import type ViewResponse from '../types/ViewResponse'
import * as userService from '../../services/user'

const getSignUp = expressAsyncHandler(async (req, res) => {
  res.render('sign-up-form')
})

const postSignUp = [
  checkSchema(userValidator),
  expressAsyncHandler(
    async (
      req: Request<any, any, ISignUpRequest, any>,
      res: ViewResponse<ISignUpUpdateView>
    ) => {
      const err = validationResult(req)

      if (!err.isEmpty()) {
        const { name, lastName, username } = req.body
        res.render('sign-up-form', {
          data: { name, lastName, username },
          user: req.user ?? null,
          errors: err.array()
        })
        return
      }

      await userService.createRegularUser(req.body)
      res.redirect('/')
    }
  )
]

export { getSignUp, postSignUp }
