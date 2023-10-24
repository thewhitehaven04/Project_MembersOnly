import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'
import signUpRouter from './routes/signUp'
import type ViewResponse from './controllers/types/ViewResponse'
import messageRouter from './routes/message'
import membershipRouter from './routes/membership'
import { sessionRouter } from './routes/session'

dotenv.config()


ServiceLaunch.setup(express())
  .then((app) => {
    app.get('/', (req, res: ViewResponse<{ user: Express.User | null }>) => {
      req.user != null ? res.redirect('/message/show') : res.redirect('session/login')
    })
    app.use('/signup', signUpRouter)
    app.use('/session', sessionRouter) 
    app.use('/message', messageRouter)
    app.use('/membership', membershipRouter)
    app.listen(process.env.PORT)
  })
  .catch((error) => {
    console.log(error)
  })
