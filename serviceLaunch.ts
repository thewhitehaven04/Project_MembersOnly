import debug from 'debug'
import type core from 'express'
import mongoose from 'mongoose'
import config from './appConfig'
import morgan from 'morgan'
import { urlencoded } from 'express'
import { Strategy } from 'passport-local'
import passport from 'passport'
import { compareSync } from 'bcrypt'
import User from './models/user'
import { getUserById, getUserByName } from './repository/user'

const log = debug('Service Launch')

function connectToDatabase(connectionString?: string): void {
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

async function setupAuth(app: core.Express): Promise<void> {
  const local = new Strategy(
    { usernameField: 'username', passwordField: 'password' },
    function (username, password, done) {
      getUserByName(username)
        .then((user) => {
          if (user !== null) {
            const userPassword = user.credentials.password
            const passwordsMatch = compareSync(password, userPassword)

            if (passwordsMatch) done(null, { username, password })
            else done(null, false, { message: 'Incorrect credentials' })
          }
        })
        .catch((err) => {
          log(err)
        })

      done(null, false, { message: 'Incorrect credentials' })
    }
  )
  passport.use(local)

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser(function (id: string, done) {
    getUserById(id)
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        done(err)
      })
  })

  app.use(passport.session())
  app.use(passport.initialize())
}

async function setup(app: core.Express): Promise<core.Express> {
  connectToDatabase(process.env.CONN_STRING)
  setupViewEngine(app)
  setupLogging(app)
  setupFormHandling(app)
  await setupAuth(app)
  return app
}

export { setup }
