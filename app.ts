import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'
import signUpRouter from './routes/signUp'
import { loginRouter } from './routes/login'
import type ViewResponse from './controllers/types/ViewResponse'

dotenv.config()

ServiceLaunch.setup(express())
  .then((app) => {
    app.get('/', (req, res: ViewResponse<{ user: Express.User | null }>) => {
      res.render('index', { user: req.user ?? null })
    })
    app.use('/signup', signUpRouter)
    app.use('/login', loginRouter)
    app.listen(process.env.PORT)
  })
  .catch((error) => {
    console.log(error)
  })
