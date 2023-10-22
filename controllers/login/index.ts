import expressAsyncHandler from 'express-async-handler'
import passport from 'passport'
import LocalAuthService from '../../services/auth'

const getLoginForm = expressAsyncHandler((req, res) => {
  if (req.user != null) {
    res.redirect('/')
    return
  }
  res.render('login-form', { user: req.user })
})

const postLogin = [
  passport.authenticate(LocalAuthService.strategyName, {
    successRedirect: '/',
    failureRedirect: '/login'
  })
]

export { getLoginForm, postLogin }
