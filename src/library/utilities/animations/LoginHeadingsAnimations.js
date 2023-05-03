import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";

// center the heading in the middle of the page vertically and then later put it in it's original position
const loginHeadingAnimation = keyframes`
    0% {
        padding-top: 20vh;
    }
    100% {
        padding-top: 0rem;
    }
`;

function LoginHeadingAnimation({ children }) {
  return (
    <Reveal delay={1000} keyframes={loginHeadingAnimation}>
      {children}
    </Reveal>
  );
}

export default LoginHeadingAnimation;
