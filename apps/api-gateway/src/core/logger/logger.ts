import { NextFunction, Request, Response } from "express"

type Level = "info" | "error" | "debug"

export function logger(message: string, level: Level = "info") {
  const timeStamp = new Date().toISOString()
  console.log(`{\nDate: ${timeStamp}\nLevel: ${level}\nmessage: ${message}\n}`)
}

export const loggerExpressMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const path = req.path
    const method = req.method
    const headers = req.rawHeaders
    const body = req.body

    const message = `Method: ${method}, Path: ${path}, headers: ${headers}, body: ${JSON.stringify(
      body
    )}`

    logger(message)
    next()
  }
}
