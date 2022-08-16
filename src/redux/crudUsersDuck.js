import axios from "axios";
import { depa, role_desc } from "../constants/Roles";
const Swal = require("sweetalert2");
//import { chooseMsg } from "../helpers/errorMsg";

/* CONSTANTS */
const initialData = {
  users: [],
}

const GET_USERS = "[USERS] GET_USERS";
const CREATE_USER = "[USERS] CREATE_USER";
/*const GET_USER_BY_ID = "[USERS] GET_USERS_BY_ID";
const UPDATE_USER = "[USERS] UPDATE_USER";
const DELETE_USER = "[USERS] DELETE_USER";*/

/* REDUCERS */
export const crudUserReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        users: action.payload
      };
    case CREATE_USER:
      return {
        users: action.payload
      }
    default:
      return { ...initialData }
  }
}

/* ACTIONS */
export const startGetUserAction = () => {
  return (dispatch, getState) => {
    const data = getState();
    const token = data.users.token
    axios
      .get(process.env.REACT_APP_GET_USERS, {
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        dispatch(getUsersAction(response.data));
        //localStorage.setItem("UsersData", response.data);
      })
  }
}

export const getUsersAction = (payload) => ({
  type: GET_USERS,
  payload
})

export const startCreateUserAction = ( userData ) => ( dispatch, getState ) => {

  const { crudUsers, users } = getState();
  const token = users.token;
  const { Rol: cat }= role_desc.find( data => data.id == userData.cat );
  const { Rol: did } = depa.find( data => data.id == userData.did )
  const department = {
    id: userData.did,
    department: did
  }

  const userCategory = {
    id: userData.cat,
    category: cat,
  }

  let dataToSend = {
    username: userData.username,
    password: userData.password,
    departmentId: parseInt(userData.did, 10),
    userCategoryId: parseInt(userData.cat,10),
  }

  if( userData.area ){
    dataToSend = { ...dataToSend, area: userData.area, };
  }

  axios
    .post(process.env.REACT_APP_GET_USERS, dataToSend, {
      headers: {
        "Authorization": `bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    .then( response => {
      if( response.status === 201 ){

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario agregado correctamente',
          timer: 2500
        })

        const newUserData = {
          id: response.data.data.id,
          area: userData.area,
          department,
          userCategory,
          username: userData.username
        }
        const newData = [ ...crudUsers.users, newUserData ];
        dispatch( createUserAction( newData ) )
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar agregar el usuario',
          timer: 1500
        })
      }
    })
    .catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar agregar el usuario',
      })
    })
  
}

export const createUserAction = ( payload ) => ({
  type: CREATE_USER,
  payload
})


export const startUpdateUserDataAction = ( data ) => ( dispatch, getState ) => {
  const { crudUsers } = getState();
  const { users } = crudUsers;
  users.map( e => {
    if( e.id === data.id ){
      if( data.username ){
        e.username =  data.username;
      }
      if( data.cat ){
        const { id, Rol: category } = role_desc.find( dat => dat.id === data.cat );
        console.log(` ID: ${ id } Category: ${ category } `);
        //e.userCategory =  { id: newData['id'], category: newData['Rol'] };
      }
      if( data.did){
        const newData = depa.find( dat => dat.id === data.did );
        e.department = newData;
      }
      if( data.area ){
        e.area = data.area;
      }
    }
    return e;
  })
}

