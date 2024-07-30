import { Request, Response, NextFunction } from "express"

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

  next()
}
