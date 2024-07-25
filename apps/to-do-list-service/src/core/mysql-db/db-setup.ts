import mysql from "mysql2/promise"

const createToDoTable = `CREATE TABLE toDoItem (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    complete BOOLEAN NOT NULL
);`

// const connection = mysql.createPool({
//   decimalNumbers: true,
//   host: "to-do-list-db",
//   port: 3306,
//   password: "root",
//   user: "root",
//   waitForConnections: true,
//   connectionLimit: 10,
//   database: "mydb",
// })

export async function connectDB() {
  console.log("connecting to db")
  try {
    return mysql.createConnection({
      decimalNumbers: true,
      host: "to-do-list-db",
      port: 3306,
      password: "root",
      user: "root",
      waitForConnections: true,
      connectionLimit: 10,
      database: "mydb",
    })
  } catch (error) {
    setTimeout(() => undefined, 5000)
    return await connectDB()
  }
}

export async function setupDatabase() {
  try {
    const conn = await connectDB()

    await conn.query(createToDoTable)

    console.log("Setup successful")
  } catch (error) {
    console.log("Setup failed trying again")
    setTimeout(setupDatabase, 5000)
  }
}
