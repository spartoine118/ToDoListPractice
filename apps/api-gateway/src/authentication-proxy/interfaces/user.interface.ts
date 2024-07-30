import { Roles } from "../enums"

export interface User {
  id: string
  email: string
  role: Roles
}
