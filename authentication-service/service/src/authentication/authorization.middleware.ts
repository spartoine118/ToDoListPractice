import { Request, Response, NextFunction } from "express"

export async function authorizedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const token = req.headers.authorization?.replace("Bearer ", "")

  // if (!token) {
  //   res.status(401).send([{ message: "UNAUTHORIZED" }])
  //   return
  // }

  // if (token) {
  //   console.log(JSON.stringify(token))
  // }

  next()
}
