import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from './types';
import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';
import environment from '../../environment'

// Check token & load user
export const loadUser = () => (dispatch: Function) => {
  const userDetails = localStorage.getItem('userDetails')
  if(userDetails) {
    dispatch({
      type: USER_LOADED,
      payload: userDetails ? JSON.parse(userDetails): null
    })
  }
};

// Login User
export const login = ({ email, password }: IAuthFunction) => (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post(`${environment.BASE_URL}/api/auth/login`, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
