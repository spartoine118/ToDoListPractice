import express from "express"
import cors from "cors"
import { toDoListRouter } from "./to-do-list/to-do-list.router"
import { loggerExpressMiddleware } from "./core/logger/logger"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(loggerExpressMiddleware())
app.use("/to-do-list", toDoListRouter)
