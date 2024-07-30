import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRouter } from "./authentication/authentication.router"
import { loggerExpressMiddleware } from "./authentication/core/logger/logger"

export const app = express()

app.use(json())
app.use(cors({ origin: "http://localhost:3000/", credentials: true }))
app.use(cookieParser())
app.use(loggerExpressMiddleware())
app.use("/auth", authRouter)
