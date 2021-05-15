import { action } from 'typesafe-actions';
import actionTypes from './constants';

export const login = (username, password) =>
  action(actionTypes.LOGIN, { username, password });

export const logout = () => action(actionTypes.LOGOUT);

export const fetchCurrentUser = () => action(actionTypes.FETCH_CURRENT_USER);

export const cleanAuthState = () => action(actionTypes.CLEAN_AUTH_STATE);

export const loginSuccess = (userData) =>
  action(actionTypes.LOGIN_SUCCESS, { userData });

export const setAuthError = (errorMessage) =>
  action(actionTypes.SET_AUTH_ERROR, { errorMessage });

export const setUserError = (errorMessage) =>
  action(actionTypes.SET_USER_ERROR, { errorMessage });

export const setCurrentUser = (userData) =>
  action(actionTypes.SET_CURRENT_USER, { userData });

export const setCognitoUser = (cognitoUser) =>
  action(actionTypes.SET_COGNITO_USER, { cognitoUser });

export const setAuthStatus = (status) =>
  action(actionTypes.SET_AUTH_STATUS, { status });

export const setNewPassword = (newPassword) =>
  action(actionTypes.SET_NEW_PASSWORD, { newPassword });

export const forgotPassword = (username) =>
  action(actionTypes.FORGOT_PASSWORD, { username });

export const resetPassword = (username, code, newPassword) =>
  action(actionTypes.RESET_PASSWORD, { username, code, newPassword });

export const getCredentials = () => action(actionTypes.GET_CREDENTIALS, {});

export const setCredentials = (credentials) =>
  action(actionTypes.SET_CREDENTIALS, { credentials });
