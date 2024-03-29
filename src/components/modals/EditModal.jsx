import { useFormik } from "formik";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { depa, role_desc } from "../../constants/Roles";
import { startUpdateUserDataAction } from "../../redux/crudUsersDuck";

const EditModal = (props) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  const { data } = props;

  const validate = (values) => {
    if (values.username && values.did !== 0 && values.cat !== 0) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: data.username,
      did: data.departmentId,
      cat: data.userCategoryId,
      area: data.area,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(startUpdateUserDataAction({ ...values, id: data.id }));
      resetForm();
      props.onHide();
      setToggle(true);
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/*console.log(formik)*/}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Usuario
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
                value={formik.values.username || ""}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridDid">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              defaultValue={0}
              value={formik.values.did}
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
            <Form.Select defaultValue={0} value={formik.values.cat} name="cat">
              <option value={0}>SELECCIONE UNA CATEGORÍA</option>
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
              value={formik.values.area || ""}
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

export default EditModal;
