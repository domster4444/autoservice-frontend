import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";

// add delay of 3 second to animate the component , so that component is displayed none for 3 seconds then it will be animated from bottom of screen to it's original position
const formAnimation = keyframes`

    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

function LoginFormAnimation({ children }) {
  return (
    <Reveal delay={1000} keyframes={formAnimation}>
      {children}
    </Reveal>
  );
}

export default LoginFormAnimation;
