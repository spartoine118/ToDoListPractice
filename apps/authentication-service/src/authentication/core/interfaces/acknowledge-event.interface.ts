import { ObjectId } from "mongodb"

export interface AcknowledgeEvent {
  channel: string
  _id: string
}
