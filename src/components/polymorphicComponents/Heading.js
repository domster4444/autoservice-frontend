import React from "react";

/**
 * It takes a prop called `as` and uses it to create a new component called `Heading` which is then
 * used to render the children.
 * @returns A React component.
 */
const Heading = ({ as, children, className }) => {
  const Heading = as;
  return <Heading className={"roboto_medium " + className}>{children}</Heading>;
};

export default Heading;
