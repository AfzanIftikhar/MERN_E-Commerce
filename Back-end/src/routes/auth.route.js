import { Router } from "express";
import {
  login,
  registerUser,
  verifyEmail,
  logOutall,
  logout,
  refreshToken,
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

export default authRoute
