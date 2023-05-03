// https://github.com/dvtng/react-loading-skeleton#readme
import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const LogoSkeletonContainer = styled.div`
  display: flex;
`;

const LogoSkeleton = () => {
  return (
    <>
      <LogoSkeletonContainer>
        <div>
          <Skeleton circle duration={0.5} style={{ height: "65px", width: "65px" }} />
        </div>
        <div style={{ width: "5rem" }} className='ms-2 pt-2'>
          <Skeleton duration={0.7} />
          <Skeleton duration={0.7} />
        </div>
      </LogoSkeletonContainer>
    </>
  );
};

export default LogoSkeleton;
