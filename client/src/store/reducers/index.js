import { combineReducers } from 'redux';
import sessionReducer from './session';
import basicReducer from './basic';
import locationReducer from './location';

export default combineReducers({
  session: sessionReducer,
  basic: basicReducer,
  location: locationReducer,
});
