import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { logger } from "./core/logger/logger"

export async function authorizedBearerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    res.status(401).send([{ message: "UNAUTHORIZED" }])
    return
  }

  if (token) {
    console.log(JSON.stringify(token))
  }

  next()
}

export async function authorizeCookieMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.JWT

  if (!token) {
    res.status(401).send([{ message: "UNAUTHORIZED" }])
    return
  }

  if (token) {
    const decrypt = jwt.decode(token) as JwtPayload
    logger(JSON.stringify(decrypt), "info")
  }

  next()
}
