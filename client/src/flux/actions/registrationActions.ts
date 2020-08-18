import axios from 'axios';
import { GET_REGISTRATIONS, REGISTRATIONS_LOADING, GET_REGISTRATION, REGISTRATION_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import environment from '../../environment';

export const getRegistrations = ({
  page = 1,
  limit = 10
}) => (dispatch: Function, getState: Function) => {
  dispatch(setRegistrationsLoading());
  axios
    .get(`${environment.BASE_URL}/api/registrations/`, {
      params: {
        page,
        limit
      },
      ...tokenConfig(getState)
    })
    .then(res =>
      dispatch({
        type: GET_REGISTRATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getRegistration = (id: string) => (dispatch: Function, getState: Function) => {
  dispatch(setRegistrationLoading());
  axios
    .get(`${environment.BASE_URL}/api/registrations/${id}?includeSsn=true`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_REGISTRATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setRegistrationsLoading = () => {
  return {
    type: REGISTRATIONS_LOADING
  };
};

export const setRegistrationLoading = () => {
  return {
    type: REGISTRATION_LOADING
  };
};
