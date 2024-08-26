import { createClient } from "redis"
import { logger } from "../authentication/core/logger/logger"

type UnaryFunction = (...x: any) => any

export interface Message {
  event: string
  data: Record<string, string>
}

export class Subscriber {
  private client: any
  private listeners: Record<string, UnaryFunction[]> = {}

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
    this.client.subscribe("authServiceChannel", (message) => {
      const { event, data } = message as Message

      const x = this.listeners[event]

      logger(`event listeners: ${JSON.stringify(x)}`, "info")

      if (x) {
        x.forEach((fn) => fn(data))
      }
    })
  }

  async addListener(event: string, fn: UnaryFunction) {
    const eventListeners = this.listeners[event]
    if (!eventListeners) {
      this.listeners = {
        ...this.listeners,
        [event]: [fn],
      }
      return
    }

    this.listeners = {
      ...this.listeners,
      [event]: [...eventListeners, fn],
    }
  }
}

export class Publisher {
  private client: any

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
  }

  async publish(message: string, channel: string) {
    this.client.publish(channel, message)
  }
}

export const redisPublisher = new Publisher()

export const redisSubscribers = new Subscriber()
