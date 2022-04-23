import axios from "axios";
import { chooseMsg } from "../helpers/errorMsg";
import saveUser from "../helpers/saveUser";

/* REDUCERS */
const headersR = {
  "Content-Type": "application/json",
};

const initialData = {
  loggedIn: false,
  fetching: false,
}

const LOGIN = "[AUTH] LOGIN";
const LOGIN_SUCCESS = "[AUTH] LOGIN_SUCCESS";
const LOGIN_FAILURE = "[AUTH] LOGIN_FAILURE";
const LOGOUT = "[AUTH] LOGOUT";

/* REDUCERS */

export const usersReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        fetching: false,
        name: action.payload.name,
        aid: action.payload.aid,
        did: action.payload.did,
        ucid: action.payload.ucid,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        fetching: false,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        fetching: false,
      };
    default:
      return state;
  }
}

/* ACTIONS */

export const startLoginAction = (data) => {
  return (dispatch, getState) => {
    axios
      .post(process.env.REACT_APP_API_LOGIN, JSON.stringify(data), {
        headers: headersR,
      })
      .then((response) => {
        if(response.statusText === 'OK'){
          dispatch(loginAction(response.data));
          saveUser(getState());
        }
      })
      .catch((error) => {
        //console.log(error.response.data.statusCode); // para obtener el mensaje de error del servidor
        chooseMsg(error.response.data.statusCode);
      });
  } 
}

export const loginAction = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: {
      name: userData.user.username,
      aid: userData.user.area,
      did: userData.user.departmentId,
      ucid: userData.user.userCategoryId,
      token: userData.token,
    }
  }
)

export const persistentLoginAction = (userData) => ({
  type: LOGIN_SUCCESS,
    payload: {
      name: userData.name,
      aid: userData.aid,
      did: userData.did,
      ucid: userData.ucid,
      token: userData.token,
    }
  })

export const loginErrorAction = (message) => ({
  type: LOGIN_FAILURE,
  payload: {
    message: message,
  }
})