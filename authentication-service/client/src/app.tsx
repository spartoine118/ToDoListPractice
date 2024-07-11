import React, { useEffect, useState } from "react"
import { authClient } from "./clients/authentication-client"

export function App() {
  const [count, setCount] = useState(0)

  const login = () => {
    authClient.login({ id: "Antoine" })
  }

  const testAuthorized = () => {
    authClient.authorized()
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={login}>Login</button>
        <button onClick={testAuthorized}>Test Authorization</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
