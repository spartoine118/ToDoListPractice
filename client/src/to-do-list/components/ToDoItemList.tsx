import React, { useEffect } from "react"
import { mockToDoItems } from "../core/mock/mock-data"
import { ToDoItem } from "./ToDoItem"
import styled from "styled-components"
import { store, useDispatch, useSelector } from "../../shared/state/store"
import { selectToDoEntities, selectToDoState } from "../state/to-do-reducer"
import { getToDoThunk } from "../state/to-do-thunks"

export function ToDoItemList() {
  const data = useSelector(selectToDoEntities)
  // TODO try and make dispatch work correctly
  const dispatch = useDispatch

  useEffect(() => {
    getToDoThunk()
  }, [])

  return (
    <Container>
      {mockToDoItems.map((item) => (
        <ToDoItem key={item.id} item={item} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  border-color: black;
  border-width: 2px;
  border-style: solid;
`
