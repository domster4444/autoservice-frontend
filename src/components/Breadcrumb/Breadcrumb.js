import React from "react";

const Breadcrumb = ({ tagArray = ["one", "two", "three", "four"] }) => {
  return (
    <ul className=' mt-2 list-unstyled bg-white breadcrumb pt-2 pb-2  rounded-2'>
      {(() => {
        return tagArray.map((i, index) => {
          if (index === tagArray.length - 1) {
            return (
              <li key={index} className='d-inline text-primary-blue'>
                {i}
              </li>
            );
          } else {
            return (
              <li key={index} className='d-inline'>
                <a className='text-decoration-none' href='#'>
                  {i}
                </a>
              </li>
            );
          }
        });
      })()}
    </ul>
  );
};

export default Breadcrumb;
