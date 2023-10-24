import { Router } from 'express'
import { getLoginForm, postLogin, postLogout } from '../controllers/login'

const sessionRouter = Router()

sessionRouter.get('/login', getLoginForm)
sessionRouter.post('/login', postLogin)
sessionRouter.get('/logout', postLogout)

export { sessionRouter } 
