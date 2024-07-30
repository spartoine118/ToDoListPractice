import { logger } from "./core/logger/logger"
import { connectDB, setupDatabase } from "./core/mysql-db/db-setup"
import { app } from "./server"

const port = process.env.SERVICE_PORT ?? 3001

app.listen(port, async () => {
  logger("Setting up database", "info")
  const connection = await connectDB()
  setupDatabase(connection)
  console.log(`Example app listening on port ${port}`)

  return async () => {
    await connection.end()
  }
})
