import mysql from "mysql2/promise"
import { logger } from "../logger/logger"
import { DatabaseName, TableNames } from "./enums"

export async function connectDB(): Promise<mysql.Connection> {
  logger("connecting to db", "info")
  try {
    return await mysql.createConnection({
      decimalNumbers: true,
      host: "to-do-list-db",
      port: parseInt(process.env.DB_PORT ?? "3306"),
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USERNAME,
      waitForConnections: true,
      connectionLimit: 10,
      database: DatabaseName.MYDB,
    })
  } catch (error) {
    setTimeout(() => undefined, 5000)
    return await connectDB()
  }
}

export async function setupDatabase(conn: mysql.Connection): Promise<void> {
  try {
    await createDatabaseTables(conn)

    await seedDatabase(conn)

    logger("Setup successful", "info")
  } catch (error) {
    logger(JSON.stringify(error), "error")
  }
}

// Database table creation queries
const createToDoTable = `CREATE TABLE ${TableNames.TO_DO_ITEMS} (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  complete BOOLEAN NOT NULL,
  userId VARCHAR(255) NOT NULL
);`

async function createDatabaseTables(conn: mysql.Connection): Promise<void> {
  try {
    logger("Creating database tables", "info")

    logger(`Creating ${TableNames.TO_DO_ITEMS} table`, "info")
    await conn.query(createToDoTable)

    logger("Database tables successfully created", "info")
  } catch (error) {
    logger(JSON.stringify(error), "error")
  }
}

// Database seeding queries
const seedToDoTable = `INSERT INTO ${TableNames.TO_DO_ITEMS} (id, name, complete, userId) VALUES
(1, 'Item 1', false, '66a844ab66003fed81c37de2'),
(2, 'Item 2', true, '66a844ab66003fed81c37de2'),
(3, 'Item 3', false, '66a844ab66003fed81c37de2'),
(4, 'Item 4', false, '66a844ab66003fed81c37de2'),
(5, 'Item 5', false, '66a844ab66003fed81c37de2');`

async function seedDatabase(conn: mysql.Connection): Promise<void> {
  try {
    logger("Seeding database", "info")

    logger(`Seeding ${TableNames.TO_DO_ITEMS} table`, "info")
    await conn.query(seedToDoTable)

    logger("Database successfully seeded", "info")
  } catch (error) {
    logger(JSON.stringify(error), "error")
  }
}
