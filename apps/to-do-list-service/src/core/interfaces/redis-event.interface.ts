export interface RedisEvent {
  type: string
  requestChannel: string
  replyChannel: string | null
  ack: boolean
  message: string
}
