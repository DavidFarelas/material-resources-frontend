import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ Component, role }) => {
  const userData = localStorage.getItem("userData");
  let userDataJson;
  let loggedIn = false;
  let userRole = undefined;

  if (userData) {
    userDataJson = JSON.parse(userData);
    loggedIn = userDataJson.users.loggedIn;
    userRole = userDataJson.users.ucid;
  }
  return (
    <>
      {loggedIn && role === userRole ? (
        <Component />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default PrivateRoutes;
