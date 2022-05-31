import React, { useState } from "react";
import { useFormik } from "formik";

import { Button, Card, Container, Form } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { startLoginAction } from "../redux/usersDuck";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const validate = (values) => {
    if (values.username && values.password) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (data) => {
      dispatch(startLoginAction(data));
      setToggle(false);
    },
  });

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
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={formik.handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                {toggle ? (
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    INICIAR SESIÓN
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={formik.handleSubmit}
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
