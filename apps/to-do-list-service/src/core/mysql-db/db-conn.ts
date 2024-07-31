import mysql from "mysql2/promise"
import { DatabaseName } from "./enums"

class DBConn {
  private readonly conn: Promise<mysql.Connection>

  constructor() {
    this.conn = mysql.createConnection({
      decimalNumbers: true,
      host: "to-do-list-db",
      port: parseInt(process.env.DB_PORT ?? "3306"),
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USERNAME,
      waitForConnections: true,
      connectionLimit: 10,
      database: DatabaseName.MYDB,
    })
  }

  async getConnection(): Promise<mysql.Connection> {
    return await this.conn
  }
}

export const dbConn = new DBConn()
