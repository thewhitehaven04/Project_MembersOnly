import expressAsyncHandler from 'express-async-handler'

const redirectToLoginFormIfNotAuthenticated = expressAsyncHandler(
  (req, res, next) => {
    if (req.user == null) {
      res.redirect('login')
      return
    }
    next()
  }
)

export default redirectToLoginFormIfNotAuthenticated
