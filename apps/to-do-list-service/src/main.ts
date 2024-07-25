import { setupDatabase } from "./core/mysql-db/db-setup"
import { app } from "./server"

// TODO change this to env var
const port = 3001

app.listen(port, async () => {
  console.log("Setting up database")
  setupDatabase()
  console.log(`Example app listening on port ${port}`)
})
