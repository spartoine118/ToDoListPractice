export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface User {
  email: string
  password: string
  role: UserRole
}
