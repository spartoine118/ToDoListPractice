import React, { useEffect } from "react"
import { ToDoItem } from "./ToDoItem"
import styled from "styled-components"
import { useSelector } from "../../shared/state/store"
import { selectToDoEntities, selectToDoLoading } from "../state/to-do-reducer"
import { getToDoThunk } from "../state/to-do-thunks"
import { Loader } from "../../shared/components/loader"
import { gql, useQuery } from "@apollo/client"

const GET_TO_DOS = gql`
  query toDoItems {
    toDoItems {
      name
      id
      complete
    }
  }
`

export function ToDoItemList() {
  const entities = useSelector(selectToDoEntities)
  const loading = useSelector(selectToDoLoading)

  const { error, data } = useQuery(GET_TO_DOS)

  useEffect(() => {
    console.log(data)
  }, [data])

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
