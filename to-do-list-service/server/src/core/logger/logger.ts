import { NextFunction, Request, Response } from "express"

type Level = "info" | "error" | "debug"

export function logger(message: string, level: Level = "info") {
  const timeStamp = new Date().toISOString()
  console.log(`{ Date: ${timeStamp}\nLevel: ${level}\nmessage: ${message} }`)
}

export const loggerExpressMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const path = req.path
    const method = req.method

    const message = `Method: ${method}, Path: ${path}`

    logger(message)
    next()
  }
}
