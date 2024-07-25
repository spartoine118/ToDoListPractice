import { MongoClient } from "mongodb"

const url = "mongodb://localhost:27017"
export const mongoClient = new MongoClient(url)

export async function connectMongoDB(): Promise<void> {
  mongoClient.connect()
}

export async function closeMongoConnection(): Promise<void> {
  mongoClient.close()
}
