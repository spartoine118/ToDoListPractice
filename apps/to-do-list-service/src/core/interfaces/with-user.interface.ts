import { User } from "../../to-do-list/interfaces/user.interface"

export type WithUser<T> = {
  user: User
} & T
