import React, { useState } from "react"
import { loginThunk } from "../state/authentication-thunks"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleLogin = () => {
    loginThunk({ email, password })
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={onChangeEmail}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
      />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}
