import { redisSubscribers } from "../redis/pubsub"
import { acknowledgeEvent } from "../redis/redis.services"

export function subscribeListeners() {
  redisSubscribers.addListener("ACKNOWLEDGE_EVENT", acknowledgeEvent)
}
