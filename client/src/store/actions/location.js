import { action } from 'typesafe-actions';
import actionTypes from './constants';

export const setLocation = (location) =>
  action(actionTypes.SET_LOCATION, { location });

export const createLocationLog = (values) =>
  action(actionTypes.CREATE_LOCATION_LOG, { values });

export const getLocationLogs = () => action(actionTypes.GET_LOCATION_LOGS, {});

export const setLocationLogs = (locationLogs) =>
  action(actionTypes.SET_LOCATION_LOGS, { locationLogs });
