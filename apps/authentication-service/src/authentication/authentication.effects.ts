import { redisSubscribers } from "../redis/pubsub"
import { dummyTest } from "./authentication.services"

export function subscribeListeners() {
  redisSubscribers.addListener("UPDATE_TO_DO", dummyTest)
}
