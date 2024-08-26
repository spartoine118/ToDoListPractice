import { logger } from "./core/logger/logger"

interface DummyTestProps {
  id: string
  name: string
  complete: boolean
}

export function dummyTest({ id, name, complete }: DummyTestProps) {
  logger(
    `Received an event for dummy test function with data: ${id} ${name} ${complete}`
  )
}
