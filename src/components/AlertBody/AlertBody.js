import React from "react";
import styled from "styled-components";

const AlertContent = styled.div`
  color: var(--primary-blue);
  p {
    font-size: 1.4rem;
  }
  span,
  b {
    font-size: 1.1rem;
  }
`;

const AlertBody = ({ children }) => {
  return <AlertContent>{children}</AlertContent>;
};

export default AlertBody;
