import { Router } from "express"
import jwt from "jsonwebtoken"
import { authorizedMiddleware } from "./authorization.middleware"

export const authRouter = Router()

authRouter.get("/", (req, res) => {
  console.log(req.cookies)
  res.send("Hello World!")
})

interface JWTPayload {
  id: string
}

authRouter.post("/login", (req, res) => {
  const data = req.body as JWTPayload

  const token = jwt.sign(data.id, "SOME_SECRET_KEY")

  // res
  //   .cookie("sessionId", token, {
  //     maxAge: 60 * 15 * 1000,
  //     expires: new Date(Date.now() + 900000),
  //     // TODO replace this with an ENV var
  //     // sameSite: "strict",
  //     // path: "/",
  //     // httpOnly: true,
  //     // domain: "http://localhost:5173",
  //     // secure: true TODO uncomment this when actual deployment
  //   })
  //   .send({ message: "logged in" })

  res
    .cookie("name", "express", {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    })
    .send({ message: "cookie set" })
})

authRouter.get("/authorized", authorizedMiddleware, (req, res) => {
  const x = req.cookies as any
  console.log(JSON.stringify(req.cookies))
  res.send({ message: "YOU ARE AUTHORIZED" })
})
