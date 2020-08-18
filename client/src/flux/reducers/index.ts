import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  registration: registrationReducer,
  error: errorReducer,
  auth: authReducer
});
