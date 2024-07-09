import React from "react"
import { ToDoItemInterface } from "../core/interfaces/item.interface"
import styled from "styled-components"
import { updateToDoThunk } from "../state/to-do-thunks"

export interface ToDoItemProps {
  item: ToDoItemInterface
}

export function ToDoItem({ item }: ToDoItemProps) {
  const onCheckboxChange = async () => {
    updateToDoThunk({ ...item, complete: !item.complete })
  }

  return (
    <Container>
      <div>{item.name}</div>
      <input
        type="checkbox"
        checked={item.complete}
        onChange={onCheckboxChange}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
