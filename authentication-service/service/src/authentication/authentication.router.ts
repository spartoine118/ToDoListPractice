import { Router } from "express"
import jwt from "jsonwebtoken"
import { authorizeCookieMiddleware } from "./authorization.middleware"
import { mongoClient } from "./core/mongodb/db-connection"
import { User } from "./core/interfaces"

export const authRouter = Router()

authRouter.get("/", (req, res) => {
  console.log(req.cookies)
  res.send("Hello World!")
})

interface JWTPayload {
  id: string
}

interface LoginPayload {
  email: string
  password: string
}

authRouter.post("/login", async (req, res) => {
  const data = req.body as LoginPayload

  const user = await mongoClient
    .db("auth-db")
    .collection<User>("user")
    .findOne(data)

  if (!user) {
    res.status(404).send({ message: "Incorrect password or email" })
    return
  }

  const token = jwt.sign(user._id.toString(), "SOME_SECRET_KEY")

  res
    .cookie("JWT", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send(user)
})

authRouter.get("/authenticate", async (req, res) => {
  const token = req.cookies.JWT

  if (!token) {
    res.status(401).send([{ message: "UNAUTHORIZED" }])
    return
  }

  const user = await mongoClient
    .db("auth-db")
    .collection<User>("user")
    .findOne(token)

  res.send(user)
})

authRouter.get("/logout", authorizeCookieMiddleware, (req, res) => {
  res.clearCookie("JWT")
})
