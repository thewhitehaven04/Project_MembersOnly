import * as dotenv from 'dotenv'
import express from 'express'
import * as ServiceLaunch from './serviceLaunch'

dotenv.config()

ServiceLaunch.connectToDatabase(process.env.CONN_STRING)

const app = express()

ServiceLaunch.setupViewEngine(app)

app.listen(process.env.PORT)

app.get('/', (req, res) => {
  res.render('layout', {})
})
