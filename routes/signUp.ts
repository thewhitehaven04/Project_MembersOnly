import { Router } from 'express'
import { getSignUp, postSignUp } from '../controllers/singUp'

const signUpRouter = Router()

signUpRouter.get('/signup', getSignUp)
signUpRouter.post('/signup', ...postSignUp)

export default signUpRouter
