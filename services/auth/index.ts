import debug from 'debug'
import { getUserById, getUserByName } from '../../repository/user'
import { type IAuthService } from './types'
import { compareSync } from 'bcrypt'
import { Strategy } from 'passport-local'

const authServiceLog = debug('localAuth')

const LocalAuthService: IAuthService = {
  serialize: (user, done) => {
    done(null, user._id)
  },
  deserialize: (id, done) => {
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
        authServiceLog(err)
      })
  },
  strategy: new Strategy(
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
          authServiceLog(err)
        })
    }
  ),
  strategyName: 'local'
}

export default LocalAuthService
