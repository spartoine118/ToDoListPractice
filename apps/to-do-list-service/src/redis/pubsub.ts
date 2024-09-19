import { createClient } from "redis"
import { logger } from "../core/logger/logger"
import { RedisEvent } from "../core/interfaces/redis-event.interface"
import { WithId } from "../core/utils/with-id"
import EventEmitter from "events"
import { dbConn } from "../core/mysql-db/db-conn"
import { TableNames } from "../core/mysql-db/enums"
import { randomUUID } from "crypto"
import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2"

type UnaryFunction = (...x: any) => any

export interface Message {
  event: string
  data: Record<string, any>
}

export class Subscriber {
  private client: any
  private emitter = new EventEmitter()

  constructor() {}

  async init() {
    this.client = await createClient({ url: "redis://redis:6379" }).connect()
    this.client.subscribe("toDoListChannel", async (data) => {
      const { type, _id, message, requestChannel, replyChannel } = JSON.parse(
        data
      ) as WithId<RedisEvent>

      logger(`Received event with data: ${data}`)

      const isACKEvent = type === "ACKNOWLEDGE_EVENT"

      const conn = await dbConn.getConnection()

      const query = isACKEvent
        ? `SELECT * FROM ${TableNames.EVENTS} WHERE _id = '${_id}' AND requestChannel = '${replyChannel}' AND ack = true;`
        : `SELECT * FROM ${TableNames.EVENTS} WHERE _id = '${_id}' AND requestChannel = '${requestChannel}' AND ack = true;`

      const [results] = await conn.query<RowDataPacket[]>(query)

      // TODO we should refactor so that the listener takes care of republishing and etc..

      if (!results.length) {
        const listeners = this.emitter.listeners(type)

        // TODO make this a transaction
        for (const fn of listeners) {
          fn({ type, _id, message, requestChannel, replyChannel })
        }

        if (!isACKEvent) {
          const insertEvent = `INSERT INTO ${TableNames.EVENTS} (_id, requestChannel, replyChannel, type, message, ack) VALUES
        ('${randomUUID().toString()}', '${requestChannel}', '${replyChannel}', '${type}', '${message}', 1)`

          conn.query(insertEvent)
        }
      }

      if (!isACKEvent) {
        redisPublisher.publish({
          _id,
          channel: replyChannel,
          type: "ACKNOWLEDGE_EVENT",
          message: JSON.stringify({ _id, channel: "toDoListChannel" }),
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
      replyChannel: "toDoListChannel",
      requestChannel: channel,
      message,
      ack: false,
    }

    if (!_id) {
      const id = randomUUID().toString()

      const insertEvent = `
      INSERT INTO ${TableNames.EVENTS} (_id, requestChannel, replyChannel, type, message, ack) VALUES
      ('${id}', '${channel}', 'toDoListChannel', '${type}', '${message}', false)
      `

      const conn = await dbConn.getConnection()

      // TODO make this a transaction
      conn.query(insertEvent)

      const eventWithId: WithId<RedisEvent> = {
        ...event,
        _id: id,
      }

      this.client.publish(channel, JSON.stringify(eventWithId))

      return
    }

    this.client.publish(channel, JSON.stringify({ ...event, _id }))
  }
}

export const redisPublisher = new Publisher()

export const redisSubscribers = new Subscriber()
