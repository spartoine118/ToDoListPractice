import React, { useEffect } from "react"
import { mockToDoItems } from "../core/mock/mock-data"
import { ToDoItem } from "./ToDoItem"
import styled from "styled-components"
import { store, useDispatch, useSelector } from "../../shared/state/store"
import {
  selectToDoEntities,
  selectToDoLoading,
  selectToDoState,
} from "../state/to-do-reducer"
import { getToDoThunk } from "../state/to-do-thunks"
import { Loader } from "../../shared/components/loader"

export function ToDoItemList() {
  const entities = useSelector(selectToDoEntities)
  const loading = useSelector(selectToDoLoading)
  // TODO try and make dispatch work correctly
  const dispatch = useDispatch

  useEffect(() => {
    getToDoThunk()
  }, [])

  return (
    <Container>
      <Loader loading={loading}>
        {Object.values(entities).map((item) => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </Loader>
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
