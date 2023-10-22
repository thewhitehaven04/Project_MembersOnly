import debug from 'debug'
import type core from 'express'
import mongoose from 'mongoose'
import config from './appConfig'
import morgan from 'morgan'
import { urlencoded } from 'express'
import { Strategy } from 'passport-local'
import passport, { use } from 'passport'
import { compareSync } from 'bcrypt'
import { getUserById, getUserByName } from './repository/user'
import session, { type SessionOptions } from 'express-session'

const log = debug('Service Launch')

function connectToDatabase(connectionString?: string): void {
  if (connectionString === undefined) {
    throw Error('No connection string provided')
  }

  mongoose
    .connect(connectionString)
    .then((conn) => {
      log('Successfully connected to the database:\n%o', conn.connection)
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

async function setupAuth(
  app: core.Express,
  sessionConfig: SessionOptions,
  authStrategy: string
): Promise<void> {
  app.use(session(sessionConfig))

  const local = new Strategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      getUserByName(username)
        .then((user) => {
          if (user !== null) {
            const passwordsMatch = compareSync(
              password,
              user.credentials.password
            )

            if (passwordsMatch) {
              const obj = user.toObject()
              done(null, { _id: obj._id.toString(), ...obj.data })
            } else done(null, false, { message: 'Wrong password!' })
            return
          }
          done(null, false, {
            message: `There is no user with name "${username}"`
          })
        })
        .catch((err) => {
          log(err)
        })
    }
  )

  passport.use(authStrategy, local)

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(function (id: string, done) {
    getUserById(id)
      .then((res) => {
        if (res !== null) {
          const obj = res.toObject()
          done(null, { ...obj.data, _id: obj._id.toString() })
          return
        }
        done('No such user', false)
      })
      .catch((err) => {
        log(err)
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
  await setupAuth(app, config.session, config.authStrategy)
  return app
}

export { setup }
