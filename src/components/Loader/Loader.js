import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <Triangle height='100' width='100' color='#0c3a60' ariaLabel='triangle-loading' wrapperStyle={{}} wrapperClassName='' visible={true} />;
    </div>
  );
};

export default Loader;
