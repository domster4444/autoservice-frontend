import React from "react";
import styled from "styled-components";

//? assets
import DeerwalkLogo from "assets/images/logo/autoservice-logo.png";

/**
 * It takes in a size and alt as props and returns an image with the size and alt props
 * @returns A styled component.
 */
const Logo = ({ size = "40px", alt = "logo", className }) => {
  const LogoImg = styled.img`
    height: ${size ? size : "100px"};
  `;
  return <LogoImg src={DeerwalkLogo} alt={alt} className={className} />;
};

export default Logo;
