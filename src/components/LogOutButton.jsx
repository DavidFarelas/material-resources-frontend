import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/usersDuck";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.users.loggedIn);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/", { replace: true });
  };
  return (
    <>
      {loggedIn && (
        <Button variant="outline-light" onClick={handleLogout}>
          {" "}
          Cerrar sesión{" "}
        </Button>
      )}
    </>
  );
};

export default LogOutButton;
