export interface RedisEvent {
  _id?: string
  type: string
  requestChannel: string
  replyChannel: string | null
  ack: boolean
  message: string
}
