import { useFormik } from "formik";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { depa, role_desc } from "../../constants/Roles";
import { startCreateUserAction } from "../../redux/crudUsersDuck";

const CreateUModal = (props) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const validate = (values) => {
    if (
      values.username &&
      values.password &&
      values.did !== 0 &&
      values.cat !== 0
    ) {
      if (values.password.length >= 8) {
        setToggle(true);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      did: 0,
      cat: 0,
      area: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(startCreateUserAction(values));
      resetForm();
      props.onHide();
      setToggle(false);
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Nombre de usuario"
                name="username"
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese Contraseña"
                name="password"
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridDid">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              defaultValue={0}
              name="did"
              onChange={formik.handleChange}
            >
              <option value={0}> SELECCIONE UN DEPARTAMENTO</option>
              {depa.map((data) => (
                <option value={data.id} key={data.Rol}>
                  {" "}
                  {data.Rol}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formGridCat"
            onChange={formik.handleChange}
          >
            <Form.Label>Categoría</Form.Label>
            <Form.Select defaultValue={0} name="cat">
              <option value={1}>SELECCIONE UNA CATEGORÍA</option>
              {role_desc.map((data) => (
                <option value={data.id} key={data.id}>
                  {" "}
                  {data.Rol}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridArea">
            <Form.Label>Área relacionada (Opcional)</Form.Label>
            <Form.Control
              placeholder="Telemática, Cálculo, etc."
              onChange={formik.handleChange}
              name="area"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Cancelar
        </Button>
        {toggle ? (
          <Button type="submit" variant="success" onClick={formik.handleSubmit}>
            {" "}
            Enviar{" "}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="success"
            onClick={formik.handleSubmit}
            disabled
          >
            {" "}
            Enviar{" "}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUModal;
