import config from '../appConfig'
import { hash } from 'bcrypt'

const hashPassword = async (password: string): Promise<string> =>
  await hash(password, config.SALT_LENGTH)

export { hashPassword }
