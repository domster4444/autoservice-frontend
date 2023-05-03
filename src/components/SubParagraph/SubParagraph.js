import React from "react";
import styled from "styled-components";

const SubHeading = styled.p`
  color: var(--primary-grey);
  font-size: 0.9rem;
`;

const SubParagraph = ({ className, children }) => {
  return <SubHeading className={"roboto_regular " + className}>{children}</SubHeading>;
};

export default SubParagraph;
