import React from "react";
import styled from "styled-components";

interface prors {
  children?: React.ReactNode;
}

export function Main({ children }: prors) {
  return <StyledMain>{children}</StyledMain>;
}

const StyledMain = styled.main`
  display: flex;
  padding: 100px 5.5%;
  background-color: ${({ theme }) => theme.bgColors.primary};
  transition: background-color 1s ease-in-out;
`;
