import { redisSubscribers } from "../redis/pubsub"
import { acknowledgeEvent } from "../redis/redis.services"
import { dummyTest } from "./authentication.services"

export function subscribeListeners() {
  redisSubscribers.addListener("UPDATE_TO_DO", dummyTest)
  redisSubscribers.addListener("ACKNOWLEDGE_EVENT", acknowledgeEvent)
}
