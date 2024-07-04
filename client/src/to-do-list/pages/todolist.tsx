import React, { useState } from "react";
import { styled } from "styled-components";
import { ToDoItemList } from "../components/ToDoItemList";
import { SearchBar } from "../components/SearchBar";

export function ToDoListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const onSearch = () => {
    console.log(searchQuery);
  };

  return (
    <Container>
      <div>Title</div>
      <ContentContainer>
        <div>
          <SearchBar
            query={searchQuery}
            onSearch={onSearch}
            onChange={onChange}
          />
          <ToDoItemList />
        </div>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const ContentContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-grow: 1;
`;
