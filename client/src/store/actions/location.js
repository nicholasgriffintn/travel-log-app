import { action } from 'typesafe-actions';
import actionTypes from './constants';

export const setLocation = (location) =>
  action(actionTypes.SET_LOCATION, { location });
