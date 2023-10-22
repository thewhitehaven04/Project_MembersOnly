import debug from 'debug'
import type core from 'express'
import mongoose from 'mongoose'
import config from './appConfig'
import morgan from 'morgan'
import { urlencoded } from 'express'
import passport from 'passport'
import session, { type SessionOptions } from 'express-session'
import { type IAuthService } from './services/auth/types'
import LocalAuthService from './services/auth'

const log = debug('Service Launch')

function connectToDatabase(connectionString?: string): void {
  if (connectionString === undefined) {
    throw Error('No connection string provided')
  }

  mongoose
    .connect(connectionString)
    .then((conn) => {
      log('Successfully connected to the database')
    })
    .catch((err) => {
      log(
        'An error took place upon attempting to connect to the database: %o',
        err
      )
      throw Error('Database connection error')
    })
}

function setupViewEngine(app: core.Express): void {
  app.set('views', config.VIEW_PATH)
  app.set('view engine', config.VIEW_ENGINE)
}

function setupLogging(app: core.Express): void {
  app.use(morgan('tiny'))
}

function setupFormHandling(app: core.Express): void {
  app.use(urlencoded({ extended: false }))
}

async function setupAuth(
  app: core.Express,
  sessionConfig: SessionOptions,
  authService: IAuthService
): Promise<void> {
  app.use(session(sessionConfig))
  
  passport.use(authService.strategyName, authService.strategy)
  passport.serializeUser(authService.serialize)
  passport.deserializeUser(authService.deserialize)

  app.use(passport.session())
  app.use(passport.initialize())
}

async function setup(app: core.Express): Promise<core.Express> {
  connectToDatabase(process.env.CONN_STRING)
  setupViewEngine(app)
  setupLogging(app)
  setupFormHandling(app)
  await setupAuth(app, config.session, LocalAuthService)
  return app
}

export { setup }
