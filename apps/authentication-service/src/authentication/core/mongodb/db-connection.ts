import { MongoClient } from "mongodb"

const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@authentication-db:${process.env.DB_PORT}`

export const mongoClient = new MongoClient(url)
