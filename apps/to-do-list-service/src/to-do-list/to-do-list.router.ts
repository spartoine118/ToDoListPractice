import * as express from "express"
import { ToDoItemInterface } from "./interfaces/todo-item.interface"
import {
  getToDoItemById,
  getToDoItemsByUserId,
  updateToDoItemById,
} from "./to-do-list.services"
import { User } from "./interfaces/user.interface"

export const toDoListRouter = express.Router()

toDoListRouter.post("/", async (req, res) => {
  const user = req.body.user as User

  const toDoItems = await getToDoItemsByUserId(user._id)

  if (!toDoItems) {
    res.status(500).send({ message: "Database Error" })
    return
  }

  res.send(toDoItems)
})

toDoListRouter.get("/:id", async (req, res) => {
  const user = req.body.user as User
  const id = req.params.id

  const toDoItem = await getToDoItemById({ user, id })

  if (!toDoItem) {
    res.status(500).send({ message: "Database Error" })
    return
  }

  res.send(toDoItem)
})

toDoListRouter.put("/:id", async (req, res) => {
  const user = req.body.user as User
  const updates = req.body.data as ToDoItemInterface

  const toDoItem = await updateToDoItemById({ user, updates })

  if (!toDoItem) {
    res.status(500).send({ message: "Database Error" })
    return
  }

  res.send(toDoItem)
})

toDoListRouter.delete("/:id", async (req, res) => {
  const user = req.body.user as User
  const updates = req.body.data as ToDoItemInterface

  const id = await updateToDoItemById({ user, updates })

  if (!id) {
    res.status(500).send({ message: "Database Error" })
    return
  }

  res.send({ message: "delete success", id })
})
