import { Router } from "express"
import jwt from "jsonwebtoken"
import { authorizeCookieMiddleware } from "./authorization.middleware"
import { mongoClient } from "./core/mongodb/db-connection"
import { JWT, User } from "./core/interfaces"
import { ObjectId } from "mongodb"
import { CollectionName, DatabaseName } from "./core/mongodb/enums"

export const authRouter = Router()

interface LoginPayload {
  email: string
  password: string
}

authRouter.post("/login", async (req, res) => {
  const data = req.body as LoginPayload

  const user = await mongoClient
    .db(DatabaseName.AUTH_DB)
    .collection<User>(CollectionName.USER)
    .findOne(data)

  if (!user) {
    res.status(404).send({ message: "Incorrect password or email" })
    return
  }

  const token = jwt.sign(
    JSON.stringify({ id: user._id.toString() }),
    process.env.SECRET ?? "SOME_SECRET"
  )

  res
    .cookie("JWT", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .send(user)
})

authRouter.get("/authenticate", authorizeCookieMiddleware, async (req, res) => {
  const token = req.cookies.JWT

  const decrypt = jwt.decode(token) as JWT

  const user = await mongoClient
    .db(DatabaseName.AUTH_DB)
    .collection<User>(CollectionName.USER)
    .findOne({ _id: new ObjectId(decrypt.id) })

  if (!user) {
    res.status(404).send([{ message: "User not found" }])
    return
  }

  res.send(user)
})

authRouter.get("/logout", authorizeCookieMiddleware, (req, res) => {
  res.clearCookie("JWT").send()
})
