import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRouter } from "./authentication/authentication.router"

export const app = express()

app.use(json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use("/auth", authRouter)
