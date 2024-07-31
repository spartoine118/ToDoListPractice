import jwt from "jsonwebtoken"
import { logger } from "../logger/logger"

export function decodeJWT(token: string): boolean {
  try {
    jwt.verify(token, process.env.SECRET ?? "SOME_SECRET")
    return true
  } catch (error) {
    logger("JWT IS INCORRECT", "error")
    return false
  }
}
