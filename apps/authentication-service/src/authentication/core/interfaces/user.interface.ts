import { ObjectId } from "mongodb"

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface User {
  _id: ObjectId
  email: string
  password: string
  role: UserRole
}
