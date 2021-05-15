import { combineReducers } from 'redux';
import sessionReducer from './session';
import basicReducer from './basic';

export default combineReducers({
  session: sessionReducer,
  basic: basicReducer,
});
