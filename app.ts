import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'
import signUpRouter from './routes/signUp'

dotenv.config()

const app = ServiceLaunch.setup(express())

app.listen(process.env.PORT)

app.use('/', signUpRouter)
