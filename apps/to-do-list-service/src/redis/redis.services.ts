import { AcknowledgeEvent } from "../core/interfaces"
import { RedisEvent } from "../core/interfaces/redis-event.interface"
import { logger } from "../core/logger/logger"
import { dbConn } from "../core/mysql-db/db-conn"
import { TableNames } from "../core/mysql-db/enums"
import { WithId } from "../core/utils/with-id"
import { redisPublisher } from "./pubsub"

export async function handleLostEvents() {
  const connection = await dbConn.getConnection()

  const [results] = await connection.query(
    `SELECT * FROM ${TableNames.EVENTS} WHERE ack = false`
  )

  const events = results as WithId<RedisEvent>[]

  for (const { _id, type, message, requestChannel } of events) {
    redisPublisher.publish({ type, message, channel: requestChannel, _id })
  }
}

export async function acknowledgeEvent({
  replyChannel,
  _id,
}: WithId<RedisEvent>) {
  const connection = await dbConn.getConnection()

  logger(`ACKNOWLEDGING EVENT WITH ID: ${_id} from ${replyChannel}`)

  const query = `UPDATE ${TableNames.EVENTS} SET ack = true WHERE _id = '${_id}' AND requestChannel = '${replyChannel}';`

  const [result, fields] = await connection.query(query)
}
