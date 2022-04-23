import React, { useState } from "react";
import { useFormik } from "formik";

import { Button, Card, Container, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { startLoginAction } from "../redux/usersDuck";

const LoginPage = () => {
  /*const [userData, setUserData] = useState({
    username: "",
    password: "",
  });*/

  const formik = useFormik({
    username: "",
    password: "",
  });

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginAction(userData));
  };

  return (
    <>
      <Container className="position-absolute top-50 start-50 translate-middle">
        <Card style={{ width: "75%", margin: "0 auto" }}>
          <Card.Header className="text-center">INICIAR SESIÓN</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  onChange={handleUserData}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleUserData}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                {toggle ? (
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    INICIAR SESIÓN
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                    disabled
                  >
                    INICIAR SESIÓN
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
