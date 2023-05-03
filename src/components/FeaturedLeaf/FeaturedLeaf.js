import React from "react";

const FeaturedLeaf = ({ children }) => {
  return (
    <div id='dashboard-featured-leaf' className='blue-leaf position-absolute d-flex justify-content-center align-items-center'>
      {children}
    </div>
  );
};

export default FeaturedLeaf;
