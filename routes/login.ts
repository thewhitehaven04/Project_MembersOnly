import { Router } from 'express'
import { getLoginForm, postLogin } from '../controllers/login'

const loginRouter = Router()

loginRouter.get('/', getLoginForm)
loginRouter.post('/', postLogin)

export { loginRouter }
