import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'
import signUpRouter from './routes/signUp'
import { loginRouter } from './routes/login'

dotenv.config()

ServiceLaunch.setup(express())
  .then((app) => {
    app.listen(process.env.PORT)

    app.use('/signup', signUpRouter)
    app.use('/login', loginRouter)
  })
  .catch((err) => {
    console.log(err)
  })
