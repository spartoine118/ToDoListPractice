import * as express from "express"
import { mockToDoItems } from "./mock/todoitems.mock"
import { ToDoItemInterface } from "./interfaces/todo-item.interface"

export const toDoListRouter = express.Router()

toDoListRouter.get("/", (req, res) => {
  res.send(mockToDoItems)
})

toDoListRouter.put("/", (req, res) => {
  const data = req.body as ToDoItemInterface

  res.send({ ...data })
})
