import expressAsyncHandler from "express-async-handler";
import AuthService from "../../services/auth";

const getLoginForm = expressAsyncHandler((req, res, next) => {
  res.render("login-form");
});

const postLogin = expressAsyncHandler(
  new AuthService().getMiddleware({
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

export { getLoginForm, postLogin };
