import React from "react";
import ErrorSVG from "assets/svg/error.svg";

const ErrorCard = () => {
  return (
    <div className='d-flex flex-column pt-5 align-items-center'>
      <img className='animate-float' src={ErrorSVG} alt='unauthorized illustrator' style={{ maxWidth: "20vw" }} />
      <h2 style={{ color: "#0f5288" }} className='mt-3'>
        Error Has Occured !
      </h2>
    </div>
  );
};

export default ErrorCard;
