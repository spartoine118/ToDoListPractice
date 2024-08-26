import { subscribeListeners } from "./authentication/authentication.effects"
import { mongoClient } from "./authentication/core/mongodb/db-connection"
import { seedDatabase } from "./authentication/core/mongodb/db-setup"
import { redisPublisher, redisSubscribers } from "./redis/pubsub"
import { app } from "./server"

const port = process.env.SERVICE_PORT ?? 3002

app.listen(port, async () => {
  await mongoClient.connect()
  await seedDatabase()
  await redisPublisher.init()
  await redisSubscribers.init()
  console.log(`Example app listening on port ${port}`)
  subscribeListeners()

  return () => {
    mongoClient.close()
  }
})
