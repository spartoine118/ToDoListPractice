import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToDoListPage } from "./to-do-list/pages/todolist"
import { Login } from "./authentication/pages/Login"
import { Logout } from "./authentication/pages/Logout"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/to-do-list" element={<ToDoListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
