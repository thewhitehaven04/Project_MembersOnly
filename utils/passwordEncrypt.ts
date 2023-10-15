import config from '../appConfig'
import { compare, hash } from 'bcrypt'

const hashPassword = async (password: string): Promise<string> =>
  await hash(password, config.SALT_LENGTH)

const comparePasswords = async (
  password: string,
  passwordToCompare: string
): Promise<boolean> => await compare(password, passwordToCompare)

export { hashPassword, comparePasswords }
