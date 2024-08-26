import { mongoClient } from "./authentication/core/mongodb/db-connection"
import { seedDatabase } from "./authentication/core/mongodb/db-setup"
import { app } from "./server"

const port = process.env.SERVICE_PORT ?? 3002

app.listen(port, async () => {
  await mongoClient.connect()
  await seedDatabase()
  console.log(`Example app listening on port ${port}`)

  return () => {
    mongoClient.close()
  }
})
