import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'

dotenv.config()

const app = ServiceLaunch.setup(express())

app.listen(process.env.PORT)

app.get('/', (req, res) => {
  res.render('layout', {})
})
