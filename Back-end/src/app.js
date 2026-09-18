import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())



// For auth
app.use('/api/auth', authRoute)


export default app