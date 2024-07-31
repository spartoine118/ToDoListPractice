import { logger } from "./core/logger/logger"
import { dbConn } from "./core/mysql-db/db-conn"
import { setupDatabase } from "./core/mysql-db/db-setup"
import { app } from "./server"

const port = process.env.SERVICE_PORT ?? 3001

app.listen(port, async () => {
  logger("Setting up database", "info")
  const conn = await dbConn.getConnection()
  await setupDatabase()

  console.log(`Example app listening on port ${port}`)

  return async () => {
    await conn.end()
  }
})
