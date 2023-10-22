import endOfTomorrow from 'date-fns/endOfTomorrow'
import { join } from 'path'


const config = {
  VIEW_PATH: join(__dirname, 'views'),
  VIEW_ENGINE: 'pug',
  SALT_LENGTH: 8,
  session: {
    expires: endOfTomorrow(),
    saveUnitialised: true,
    resave: false,
    secret: 'test_member'
  },
  authStrategy: 'local'
}

export default config

