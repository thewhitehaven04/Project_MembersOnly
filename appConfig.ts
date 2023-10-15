import { join } from 'path'

const config = {
  VIEW_PATH: join(__dirname, '../', 'views'),
  VIEW_ENGINE: 'pug',
  SALT_LENGTH: 8
}

export default config
