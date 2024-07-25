import React from "react";
import styled from "styled-components";

export interface SearchBarProps {
  query: string;
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ query, onSearch, onChange }: SearchBarProps) {
  return (
    <Container>
      <input
        type="text"
        placeholder="Input an item"
        value={query}
        onChange={onChange}
      ></input>
      <button type="button" onClick={onSearch}>
        Search!
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
