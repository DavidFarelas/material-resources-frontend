import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import EditModal from "../../components/modals/EditModal";

const CRUDusers = () => {
  const token = useSelector((data) => data.users.token);
  const [usersData, setUsersData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_USERS, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [setUsersData, token]);
  return (
    <>
      {/* Registrar Usuarios */}
      <Button variant="primary" onClick={() => setShowEdit(true)}>
        Registrar Usuario
      </Button>

      <EditModal show={showEdit} onHide={() => setShowEdit(false)} />
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
          {usersData &&
            usersData.map((user) => (
              <tr key={user.id}>
                <td> {user.username} </td>
                <td> {user.department.department} </td>
                <td> {user.area || "No aplica"} </td>
                <td> {user.userCategory.category} </td>
                <td>
                  <div className="d-grid gap-2">
                    <ButtonGroup>
                      <Button variant="outline-warning"> Editar </Button>
                      <Button variant="outline-danger"> Eliminar </Button>
                    </ButtonGroup>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CRUDusers;
