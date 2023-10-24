import { join } from 'path'

const config = {
  VIEW_PATH: join(__dirname, 'views'),
  VIEW_ENGINE: 'pug',
  SALT_LENGTH: 8,
  session: {
    expires: 86400, 
    saveUnitialised: true,
    resave: false,
  }
}

export default config
