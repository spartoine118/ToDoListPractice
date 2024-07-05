import React from "react"
import { ToDoItemInterface } from "../core/interfaces/item.interface"
import styled from "styled-components"

export interface ToDoItemProps {
  item: ToDoItemInterface
}

export function ToDoItem({ item }: ToDoItemProps) {
  return (
    <Container>
      <div>{item.name}</div>
      <input type="checkbox" checked={item.complete} readOnly />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
