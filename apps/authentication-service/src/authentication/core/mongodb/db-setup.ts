import { ObjectId } from "mongodb"
import { mongoClient } from "./db-connection"
import { encryptString } from "../utils/encrypt-password"
import { UserRole } from "../interfaces"
import { logger } from "../logger/logger"
import { CollectionName, DatabaseName } from "./enums"

export async function seedDatabase() {
  try {
    logger("Seeding database", "info")

    await mongoClient
      .db(DatabaseName.AUTH_DB)
      .collection(CollectionName.USER)
      .insertOne({
        _id: new ObjectId("66a844ab66003fed81c37de2"),
        email: "admin@4-ti.com",
        password: encryptString("root"),
        role: UserRole.ADMIN,
      })

    logger("Database successfully seeded", "info")
  } catch (error) {
    logger(JSON.stringify(error), "error")
  }
}
