import React from "react"
import { logoutThunk } from "../state/authentication-thunks"

export function Logout() {
  const onClickLogout = () => {
    logoutThunk()
  }
  return (
    <div>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
