import axios from "axios";
//import { chooseMsg } from "../helpers/errorMsg";

/* CONSTANTS */
const initialData = {
  users: {},
}

const GET_USERS = "[USERS] GET_USERS";
/*const GET_USER_BY_ID = "[USERS] GET_USERS_BY_ID";
const CREATE_USER = "[USERS] CREATE_USER";
const UPDATE_USER = "[USERS] UPDATE_USER";
const DELETE_USER = "[USERS] DELETE_USER";*/

/* REDUCERS */
export const crudUserReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        users: action.payload
      };
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
        localStorage.setItem("UsersData", response.data);
      })
  }
}

export const getUsersAction = (payload) => ({
  type: GET_USERS,
  payload
})