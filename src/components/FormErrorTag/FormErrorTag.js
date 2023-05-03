// error for form validation

import React from "react";
import styled from "styled-components";
const FormErrorTagWrapper = styled.div`
  p {
    color: #f43260;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;

const FormErrorTag = ({ children }) => {
  return (
    <FormErrorTagWrapper>
      <p className='d-flex align-items-center'>{children}</p>
    </FormErrorTagWrapper>
  );
};

export default FormErrorTag;
