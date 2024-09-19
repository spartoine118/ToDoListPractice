import { logger } from "./core/logger/logger"
import { dbConn } from "./core/mysql-db/db-conn"
import { setupDatabase } from "./core/mysql-db/db-setup"
import { redisPublisher, redisSubscribers } from "./redis/pubsub"
import { app } from "./server"
import { subscribeListeners } from "./to-do-list/to-do-list.effects"

const port = process.env.SERVICE_PORT ?? 3001

app.listen(port, async () => {
  logger("Setting up database", "info")
  const conn = await dbConn.getConnection()
  await setupDatabase()
  await redisSubscribers.init()
  await redisPublisher.init()
  console.log(`Example app listening on port ${port}`)
  subscribeListeners()

  return async () => {
    await conn.end()
  }
})
