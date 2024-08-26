export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface User {
  _id: string
  email: string
  role: UserRole
}
