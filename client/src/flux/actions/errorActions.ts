import { GET_ERRORS, CLEAR_ERRORS } from './types';
import { IMsg } from '../../types/interfaces';
import { logout } from './authActions';

// RETURN ERRORS
export const returnErrors = (msg: IMsg, status: number, id: any = null) => (dispatch: Function) => {
  if(status === 401) {
    dispatch(logout())
  }
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
