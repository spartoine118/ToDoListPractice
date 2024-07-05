import express from "express"
import cors from "cors"
import { toDoListRouter } from "./to-do-list/to-do-list.router"

export const app = express()

app.use(cors())
app.use("/to-do-list", toDoListRouter)
