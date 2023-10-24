import expressAsyncHandler from 'express-async-handler'
import { checkSchema, validationResult } from 'express-validator'
import messageRequestValidator from '../../models/message/validation'
import redirectToLoginFormIfNotAuthenticated from '../../middleware/auth'
import * as MessageService from './../../services/message'
import {
  type INewMessageDataView,
  type IMessageListResponse,
  type INewMessageRequest
} from './types'
import { type Request } from 'express'
import type ViewResponse from '../types/ViewResponse'

const getMessageForm = [
  redirectToLoginFormIfNotAuthenticated,
  expressAsyncHandler(async (req, res) => {
    res.render('new-message')
  })
]

const postMessage = [
  redirectToLoginFormIfNotAuthenticated,
  checkSchema(messageRequestValidator),
  expressAsyncHandler(
    async (
      req: Request<any, any, INewMessageRequest, any>,
      res: ViewResponse<INewMessageDataView>
    ) => {
      const errors = validationResult(req)

      if (req.user != null) {
        if (errors.isEmpty()) {
          await MessageService.saveMessage(req.body, req.user)
          res.redirect('/')
          return
        }
        res.render('new-message', {
          errors: errors.array(),
          data: req.body
        })
      }
    }
  )
]

const getMessages = [
  redirectToLoginFormIfNotAuthenticated,
  expressAsyncHandler(async (req, res: ViewResponse<IMessageListResponse>) => {
    if (req.user != null) {
      const messages = await MessageService.getFormattedMessages(20, req.user)
      res.render('home', {
        messages,
        user: req.user
      })
    }
  })
]

export { getMessageForm, postMessage, getMessages }
