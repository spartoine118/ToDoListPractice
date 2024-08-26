import { createClient } from "redis"
import { logger } from "../core/logger/logger"

export interface Message {
  event: string
  data: Record<string, any>
}

export class Subscriber {
  private client: any

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
    this.client.subscribe("toDoListChannel", (message) => {
      logger(
        `Logging message received from redis with message: ${message}`,
        "debug"
      )
    })
  }
}

export class Publisher {
  private client: any

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
  }

  async publish(message: Message, channel: string) {
    this.client.PUBLISH(channel, JSON.stringify(message))
  }
}

export const redisPublisher = new Publisher()

export const redisSubscribers = new Subscriber()
