import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/usersDuck";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/", { replace: true });
  };
  return (
    <Button variant="outline-light" onClick={handleLogout}>
      {" "}
      Cerrar sesión{" "}
    </Button>
  );
};

export default LogOutButton;
