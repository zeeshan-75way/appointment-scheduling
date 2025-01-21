import { Router } from "express";
import * as UserValidation from "./user.validation";
import * as UserController from "./user.controller";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { limiter } from "../common/helper/rate-limiter";
const router = Router();

router
  .post(
    "/register",
    limiter,
    UserValidation.createUser,
    catchError,
    UserController.createUser
  )
  .post(
    "/login",
    limiter,

    UserValidation.loginUser,
    catchError,
    UserController.loginUser
  )
  .get("/all", roleAuth(["ADMIN"]), UserController.getAllUsers)
  .get("/refresh", UserController.refreshTokens)
  .patch(
    "/logout",
    limiter,
    roleAuth(["USER", "ADMIN"]),
    UserController.logoutUser
  )
  .post("/forgot-password", limiter, UserController.forgotPassword)
  .patch("/update-password", limiter, UserController.updatePassword);

export default router;
