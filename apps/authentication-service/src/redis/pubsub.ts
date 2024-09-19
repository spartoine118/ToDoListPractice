import { createClient } from "redis"
import { logger } from "../authentication/core/logger/logger"
import { mongoClient } from "../authentication/core/mongodb/db-connection"
import {
  CollectionName,
  DatabaseName,
} from "../authentication/core/mongodb/enums"
import EventEmitter from "events"
import { RedisEvent } from "../authentication/core/interfaces"
import { ObjectId, UUID, WithId } from "mongodb"

type UnaryFunction = (...x: any) => any

export interface Message {
  event: string
  data: Record<string, string>
}

export class Subscriber {
  private client: any
  // private listeners: Record<string, UnaryFunction[]> = {}
  private emitter = new EventEmitter()

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
    this.client.subscribe("authServiceChannel", async (data) => {
      const { type, _id, message, requestChannel, replyChannel } = JSON.parse(
        data
      ) as RedisEvent

      const isACKEvent = type === "ACKNOWLEDGE_EVENT"

      logger(
        `Received event with following event: ${type} message: ${message} from: ${replyChannel} id: ${_id}`
      )

      const query = isACKEvent
        ? { _id, requestChannel: replyChannel, ack: true }
        : { _id, requestChannel, ack: true }

      const results = await mongoClient
        .db(DatabaseName.AUTH_DB)
        .collection<RedisEvent>(CollectionName.EVENTS)
        .findOne(query)

      if (!results) {
        const listeners = this.emitter.listeners(type)

        for (const fn of listeners) {
          // TODO make this a transaction
          fn({ type, _id, message, requestChannel, replyChannel })
        }

        await mongoClient
          .db(DatabaseName.AUTH_DB)
          .collection<RedisEvent>(CollectionName.EVENTS)
          .insertOne({
            _id,
            requestChannel,
            replyChannel,
            type,
            message,
            ack: true,
          })
      }

      if (!isACKEvent) {
        redisPublisher.publish({
          _id,
          channel: replyChannel,
          type: "ACKNOWLEDGE_EVENT",
          message: JSON.stringify({ _id, channel: "authServiceChannel" }),
        })
      }
    })
  }

  addListener(event: string, fn: UnaryFunction) {
    this.emitter.addListener(event, fn)
  }
}

interface PublishProps {
  message: string
  channel: string
  type: string
  _id?: string
}

export class Publisher {
  private client: any

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
  }

  async publish({ message, channel, type, _id }: PublishProps) {
    const event: RedisEvent = {
      type,
      replyChannel: "authServiceChannel",
      requestChannel: channel,
      message,
      ack: false,
    }

    if (!_id) {
      // TODO make this a transaction

      const id = new UUID()

      const result = await mongoClient
        .db(DatabaseName.AUTH_DB)
        .collection<RedisEvent>(CollectionName.EVENTS)
        .insertOne({ ...event, _id: id.toString() })

      const eventWithId: WithId<RedisEvent> = {
        ...event,
        _id: result.insertedId,
      }

      this.client.publish(channel, JSON.stringify(eventWithId))

      return
    }

    this.client.publish(channel, JSON.stringify({ ...event, _id }))
  }
}

export const redisPublisher = new Publisher()

export const redisSubscribers = new Subscriber()
