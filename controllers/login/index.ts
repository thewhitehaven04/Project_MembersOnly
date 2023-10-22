import expressAsyncHandler from 'express-async-handler'
import passport from 'passport'
import config from '../../appConfig'

const getLoginForm = expressAsyncHandler((req, res) => {
  if (req.user != null) {
    res.redirect('/')
    return
  }
  res.render('login-form', { user: req.user })
})

const postLogin = [
  passport.authenticate(config.authStrategy, {
    successRedirect: '/',
    failureRedirect: '/login'
  })
]

export { getLoginForm, postLogin }
