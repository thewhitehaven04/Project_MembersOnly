import debug from 'debug'
import type core from 'express'
import mongoose from 'mongoose'
import config from './appConfig'

const log = debug('Service Launch')

function connectToDatabase (connectionString?: string): void {
  if (connectionString === undefined) {
    throw Error('No connection string provided')
  }

  mongoose
    .connect(connectionString)
    .then((conn) => {
      log('Successfully connected to the database:\n%o', conn.connection.config)
    })
    .catch((err) => {
      log(
        'An error took place upon attempting to connect to the database:\n%o',
        err
      )
      throw Error('Database connection error')
    })
}

function setupViewEngine (app: core.Express): void {
  app.set('views', config.VIEW_PATH)
  app.set('view engine', config.VIEW_ENGINE)
}

function setupLogging (app: core.Express): void {
  app.use(morgan('tiny'))
}

function setup (app: core.Express): core.Express {
  connectToDatabase(process.env.CONN_STRING)
  setupViewEngine(app)
  setupLogging(app)
  return app
}

export { setup }
