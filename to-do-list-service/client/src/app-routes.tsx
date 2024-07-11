import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToDoListPage } from "./to-do-list/pages/todolist";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
        <Route path="/to-do-list" element={<ToDoListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
