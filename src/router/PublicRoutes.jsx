import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import roles from "../constants/Roles";

const PublicRoutes = ({ Component }) => {
  const { loggedIn, ucid } = useSelector((state) => state.users);
  return <>{!loggedIn ? <Component /> : selectUserRole(ucid)}</>;
};

const selectUserRole = (role) => {
  switch (role) {
    case roles.ADMIN:
      return <Navigate to="/admin" />;
    case roles.LAB:
      return <Navigate to="/labs" />;
    default:
      break;
  }
};

export default PublicRoutes;
