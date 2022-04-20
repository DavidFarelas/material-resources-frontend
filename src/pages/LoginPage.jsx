import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const LoginPage = () => {
  return (
    <>
      <Container className="position-absolute top-50 start-50 translate-middle">
        <Card>
          <Card.Header className="text-center">INICIAR SESIÓN</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  INICIAR SESIÓN
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
