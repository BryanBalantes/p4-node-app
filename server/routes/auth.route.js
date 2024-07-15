import { Router } from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

// router object
const authRouter = Router();

// routing
// REGISTER || METHOD POST
authRouter.post("/register", registerController);

// LOGIN || POST
authRouter.post("/login", loginController);

// Forgot Password || POST
authRouter.post("/forgot-password", forgotPasswordController);

// test routes
authRouter.get("/test", requireSignIn, isAdmin, testController);

// protected User route auth
authRouter.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Admin route auth
authRouter.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default authRouter;
