import { RedisEvent } from "./core/interfaces"
import { logger } from "./core/logger/logger"

interface DummyTestProps {
  id: string
  name: string
  complete: boolean
}

export function dummyTest({ message }: RedisEvent) {
  const { id, name, complete } = JSON.parse(message) as DummyTestProps
  logger(
    `Received an event for dummy test function with data: ${id} ${name} ${complete}`
  )
}
