import React from "react";
import { Navigate } from "react-router-dom";
import { getDataByValue } from "services/LocalStorageService";
import { useSelector } from "react-redux";

const LoggedInPrivateRoute = ({ children }) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  if (!getDataByValue("accessToken" || !loggedUser)) {
    return <Navigate to='/' />;
  }

  return children;
};

export default LoggedInPrivateRoute;
