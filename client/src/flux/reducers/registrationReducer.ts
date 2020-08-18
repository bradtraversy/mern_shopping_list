import {
  GET_REGISTRATIONS,
  REGISTRATIONS_LOADING,
  REGISTRATION_LOADING,
  GET_REGISTRATION
} from '../actions/types';
import { IAction, IRegistration } from '../../types/interfaces';

const initialState = {
  registrations: [],
  page: 1,
  limit: 20,
  loading: false
};

interface IState {
  registrations: IRegistration[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_REGISTRATIONS:
      return {
        ...state,
        registrations: action.payload.data,
        count: action.payload.metaData.count,
        loading: false
      };
    case REGISTRATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REGISTRATION:
      return {
        ...state,
        registration: action.payload.data,
        registrationLoading: false
      }
    case REGISTRATION_LOADING:
      return {
        ...state,
        registrationLoading: true,
      }
    default:
      return state;
  }
}
