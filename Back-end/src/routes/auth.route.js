import { Router } from "express";
import { login, registerUser,verifyEmail } from "../controllers/auth.controller.js";

const authRoute = Router() 


// POST /api/auth/register
authRoute.post("/register", registerUser)

// POST /api/auth.login
authRoute.post("/login" ,login )

// POST / api/auth/verifyEmail
authRoute.post("/verifyEmail", verifyEmail)


export default authRoute
