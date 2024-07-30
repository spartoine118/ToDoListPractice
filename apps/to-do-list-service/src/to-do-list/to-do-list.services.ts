import { ResultSetHeader, RowDataPacket } from "mysql2"
import { connectDB } from "../core/mysql-db/db-setup"
import { ToDoItemInterface } from "./interfaces/todo-item.interface"
import { logger } from "../core/logger/logger"
import { WithUser } from "../core/interfaces"

export async function getToDoItemsByUserId(
  id: string
): Promise<ToDoItemInterface[] | null> {
  try {
    const conn = await connectDB()

    const query = `SELECT * FROM to_do_items WHERE userId = "${id}";`

    const results = await conn.query<RowDataPacket[]>(query)

    await conn.end()

    return results[0] as ToDoItemInterface[]
  } catch (error) {
    logger(JSON.stringify(error), "error")

    return null
  }
}

export async function getToDoItemById({
  id,
  user,
}: WithUser<{ id: string }>): Promise<ToDoItemInterface | null> {
  try {
    const conn = await connectDB()

    const query = `SELECT * FROM to_do_items WHERE id = "${id}", userId = "${user._id}";`

    const results = await conn.query<RowDataPacket[]>(query)

    await conn.end()

    if (results[0].length !== 1) {
      throw Error("Error no or multiple toDoItem with the same ID")
    }

    return results[0][0] as ToDoItemInterface
  } catch (error) {
    logger(JSON.stringify(error), "error")

    return null
  }
}

export async function updateToDoItemById({
  user,
  updates,
}: WithUser<{
  updates: ToDoItemInterface
}>): Promise<ToDoItemInterface | null> {
  try {
    const conn = await connectDB()

    const query = `UPDATE to_do_items SET name = "${updates.name}", complete = ${updates.complete} WHERE id = ${updates.id}, userId = "${user._id}";`

    const results = await conn.query<ResultSetHeader>(query)

    await conn.end()

    if (!results[0].affectedRows) {
      throw Error(`Error while updating to_do_item id: ${updates.id}`)
    }

    return updates
  } catch (error) {
    logger(JSON.stringify(error), "error")

    return null
  }
}

export async function deleteToDoItemById({
  user,
  id,
}: WithUser<{ id: string }>): Promise<string | null> {
  try {
    const conn = await connectDB()

    const query = `DELETE FROM to_do_items WHERE id = ${id}, userId = "${user._id}";`

    const results = await conn.query<ResultSetHeader>(query)

    await conn.end()

    if (!results[0].affectedRows) {
      throw Error(`Error while deleting to_do_item id: ${id}`)
    }

    return id
  } catch (error) {
    logger(JSON.stringify(error), "error")

    return null
  }
}
