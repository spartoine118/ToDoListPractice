import { Router } from "express"
import jwt from "jsonwebtoken"
import { authorizeCookieMiddleware } from "./authorization.middleware"
import { mongoClient } from "./core/mongodb/db-connection"
import { User } from "./core/interfaces"
import { ObjectId } from "mongodb"

export const authRouter = Router()

interface JWT {
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

  const token = jwt.sign(
    JSON.stringify({ id: user._id.toString() }),
    "SOME_SECRET_KEY"
  )

  res
    .cookie("JWT", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send(user)
})

authRouter.get("/authenticate", async (req, res) => {
  console.log("In authentication service /authenticate route")
  console.log(req.headers)
  console.log(req.cookies)

  const token = req.cookies.JWT

  console.log(token)

  if (!token) {
    res.status(401).send([{ message: "UNAUTHORIZED" }])
    return
  }

  const decrypt = jwt.decode(token) as JWT

  console.log(decrypt)

  const user = await mongoClient
    .db("auth-db")
    .collection<User>("user")
    .findOne({ _id: new ObjectId(decrypt.id) })

  res.send(user)
})

authRouter.get("/logout", authorizeCookieMiddleware, (req, res) => {
  res.clearCookie("JWT").send()
})
