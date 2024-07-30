import { Roles } from "../enums"

export interface User {
  _id: string
  email: string
  role: Roles
}
