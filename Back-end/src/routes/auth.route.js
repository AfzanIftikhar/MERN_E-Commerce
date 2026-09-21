import { Router } from "express";
import {
  login,
  registerUser,
  verifyEmail,
  logOutall,
  logout,
  getUser,
  refreshToken,
  forgot_password,
  verify_OTP,
  reset_password,
} from "../controllers/auth.controller.js";
import { verifyRefreshToken } from "../middlewares/auth.middleware.js";

const authRoute = Router() 


// POST /api/auth/register
authRoute.post("/register", registerUser)

// POST /api/auth/login
authRoute.post("/login" ,login )

// POST /api/auth/verifyEmail
authRoute.post("/verifyEmail", verifyEmail)

// POST /api/auth.logout
authRoute.post("/logout",verifyRefreshToken, logout);


// POST /api/auth/logOutAll
authRoute.post("/logoutAll",verifyRefreshToken, logOutall)


// POST /api/auth/refreshToken
authRoute.post("/refreshToken" ,verifyRefreshToken, refreshToken);

// /GET /api/auth/getUser
authRoute.get("/getUser", getUser)

// POST /api/auth/forgot-password
authRoute.post("/forgot-password", forgot_password)

// POST /api/auth/verify-OTP
authRoute.post("/verify-otp", verify_OTP)

// POST /api/auth/reset-password

authRoute.post("/reset-password", reset_password);

export default authRoute
