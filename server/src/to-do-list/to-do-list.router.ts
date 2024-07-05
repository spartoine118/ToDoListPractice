import * as express from "express"
import { mockToDoItems } from "./mock/todoitems.mock"

export const toDoListRouter = express.Router()

toDoListRouter.get("/", (req, res) => {
  res.send(mockToDoItems)
})
