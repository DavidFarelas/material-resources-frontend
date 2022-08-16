import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Button, ButtonGroup, Table } from "react-bootstrap";

import EditModal from "../../components/modals/EditModal";
import CreateUModal from "../../components/modals/CreateUModal";

import { useDispatch } from "react-redux";
import { startGetUserAction } from "../../redux/crudUsersDuck";

const CRUDusers = () => {
  const { users } = useSelector((data) => data.crudUsers);

  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [showCreateU, setShowCreateU] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const fillDataToEdit = (data) => {
    setDataEdit(data);
    setShowEdit(true);
  };

  useEffect(() => {
    dispatch(startGetUserAction());
  }, [dispatch]);

  return (
    <>
      {/* Registrar Usuarios */}
      <Button variant="primary" onClick={() => setShowCreateU(true)}>
        Registrar Usuario
      </Button>

      <CreateUModal show={showCreateU} onHide={() => setShowCreateU(false)} />
      {/* Ver usuarios Registrados y acciones */}
      <Table striped bordered hover className="mt-5" variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Área</th>
            <th>Tipo Usuario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td> {user.username} </td>
              <td> {user.department.department} </td>
              <td> {user.area || "No aplica"} </td>
              <td> {user.userCategory.category} </td>
              <td>
                <div className="d-grid gap-2">
                  <ButtonGroup>
                    <Button
                      variant="outline-warning"
                      onClick={() => fillDataToEdit(user)}
                    >
                      {" "}
                      Editar{" "}
                    </Button>
                    <Button variant="outline-danger"> Eliminar </Button>
                  </ButtonGroup>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        data={dataEdit}
      />
    </>
  );
};

export default CRUDusers;
