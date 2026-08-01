import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieprarser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes.js'
import errorHandler from './middlewares/error.middleware.js'
import interviewRoutes from './modules/interview/interview.route.js'
import dashboardRoutes from './modules/dashboard/dashboard.routes.js'

const app = express()

app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieprarser())
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "*";
app.use(cors({
    origin: clientUrl,
    credentials: true
}))
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/v1/auth", authRoutes)
app.use(
    '/api/v1/interviews',
    interviewRoutes
)
app.use(
    '/api/v1/interview',
    interviewRoutes
)

app.use(
    "/api/v1/dashboard",
    dashboardRoutes
)

app.use(errorHandler)

export default app;