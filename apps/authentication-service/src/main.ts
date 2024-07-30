import { mongoClient } from "./authentication/core/mongodb/db-connection"
import { app } from "./server"

const port = 3002

app.listen(port, () => {
  mongoClient.connect()
  console.log(`Example app listening on port ${port}`)

  return () => {
    mongoClient.close()
  }
})
