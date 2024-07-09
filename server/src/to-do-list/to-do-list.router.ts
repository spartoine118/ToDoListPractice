import * as express from "express"
import { mockToDoItems, ToDoItemInterface } from "./mock/todoitems.mock"

export const toDoListRouter = express.Router()

export interface RequestBody {
  data: object
}

toDoListRouter.get("/", (req, res) => {
  res.send(mockToDoItems)
})

toDoListRouter.put("/", (req, res) => {
  const { data } = req.body as RequestBody

  res.send({ ...data })
})
