// https://github.com/dvtng/react-loading-skeleton#readme
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonPlaceholder = () => {
  return (
    <>
      <SkeletonTheme baseColor='#CED4DA' highlightColor='#F7F7F7'>
        <Skeleton duration={0.7} />
        <Skeleton circle duration={0.5} style={{ height: "65px", width: "65px" }} />
        <Skeleton duration={0.7} count={2} />
      </SkeletonTheme>
    </>
  );
};

export default SkeletonPlaceholder;
