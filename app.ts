import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'
import signUpRouter from './routes/signUp'
import { loginRouter } from './routes/login'
import type ViewResponse from './controllers/types/ViewResponse'
import messageRouter from './routes/message'

dotenv.config()

ServiceLaunch.setup(express())
  .then((app) => {
    app.get('/', (req, res: ViewResponse<{ user: Express.User | null }>) => {
      req.user != null ? res.redirect('/message/show') : res.redirect('login')
    })
    app.use('/signup', signUpRouter)
    app.use('/login', loginRouter)
    app.use('/message', messageRouter)
    app.listen(process.env.PORT)
  })
  .catch((error) => {
    console.log(error)
  })
