import React from "react";
import styled from "styled-components";

const TertiaryButton = styled.button`
  padding: 0.45rem 1.5rem;
  outline: none;
  border: none;
  background: #0c3a60;
  border-radius: 0.5rem;
  transition: 0.5s;

  &:active {
    /* bouncing effect  */
    transform: scale(0.95);
    transition: 0.1s;
  }

  &:hover {
    background: #0c3a60;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const TertiaryBtn = ({ children }) => {
  return <TertiaryButton className='text-white'>{children}</TertiaryButton>;
};
