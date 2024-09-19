import { ObjectId } from "mongodb"
import { AcknowledgeEvent, RedisEvent } from "../authentication/core/interfaces"
import { mongoClient } from "../authentication/core/mongodb/db-connection"
import {
  DatabaseName,
  CollectionName,
} from "../authentication/core/mongodb/enums"
import { redisPublisher } from "./pubsub"

export async function handleLostEvents() {
  const events = await mongoClient
    .db(DatabaseName.AUTH_DB)
    .collection<RedisEvent>(CollectionName.EVENTS)
    .find({ ack: false })
    .toArray()

  for (const { _id, type, message, requestChannel } of events) {
    redisPublisher.publish({ type, message, channel: requestChannel, _id })
  }
}

export async function acknowledgeEvent({ channel, _id }: AcknowledgeEvent) {
  await mongoClient
    .db(DatabaseName.AUTH_DB)
    .collection<RedisEvent>(CollectionName.EVENTS)
    .findOneAndUpdate({ _id, requestChannel: channel }, { $set: { ack: true } })
}
