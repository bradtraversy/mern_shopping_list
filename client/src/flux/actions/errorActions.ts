import { GET_ERRORS, CLEAR_ERRORS } from './types';
import { IMsg } from '../../types/interfaces';

// RETURN ERRORS
export const returnErrors = (msg: IMsg, status: number, id: any = null) => {
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
