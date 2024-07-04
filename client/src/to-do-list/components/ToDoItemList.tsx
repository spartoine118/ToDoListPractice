import React from "react";
import { mockToDoItems } from "../core/mock/mock-data";
import { ToDoItem } from "./ToDoItem";
import styled from "styled-components";

export function ToDoItemList() {
  return (
    <Container>
      {mockToDoItems.map((item) => (
        <ToDoItem item={item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  border-color: black;
  border-width: 2px;
  border-style: solid;
`;
