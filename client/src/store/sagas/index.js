import { Auth } from 'aws-amplify';
import {
  call,
  all,
  fork,
  put,
  takeLatest,
  apply,
  select,
} from 'redux-saga/effects';
import actionTypes, { API_URL } from '../actions/constants';
import {
  setCognitoUser,
  setAuthStatus,
  loginSuccess,
  setAuthError,
  setCurrentUser,
  setUserError,
  setCredentials,
} from '../actions/session';
import { setLocationLogs } from '../actions/location';

const errorMessage = (err) => {
  if (typeof err === 'string') {
    return err;
  }

  if (err && err.message) {
    return err.message;
  }

  return 'Error occurred during auth.';
};

const cleanAuthState = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};

function* handleLogout() {
  cleanAuthState();
}

function* handleLogin(action) {
  const { username, password } = action.payload;
  try {
    const cognitoUser = yield apply(Auth, Auth.signIn, [username, password]);

    yield put(setCognitoUser(cognitoUser));

    if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
      yield put(setAuthStatus('requireNewPassword'));
    } else if (cognitoUser.challengeName === 'SMS_MFA') {
      yield put(setAuthStatus('mfaRequired'));
    } else {
      const currentUser = yield apply(Auth, Auth.currentUserInfo, []);
      yield put(loginSuccess(currentUser));
      yield put(setAuthStatus('signedIn'));
    }
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

/**
 * Touches the current authenticated user, if failed to retrieve the user info, user is not logged in.
 */
function* handleFetchCurrentUser() {
  try {
    const currentUser = yield apply(Auth, Auth.currentAuthenticatedUser, [
      undefined,
    ]);
    yield put(setCurrentUser(currentUser));
    yield put(setAuthStatus('signedIn'));
  } catch (err) {
    console.error(err);
    yield put(setUserError(errorMessage(err)));
  }
}

function* handleSetNewPassword(action) {
  const { newPassword } = action.payload;
  try {
    const cognitoUser = yield select((state) => state.session.cognitoUser);

    yield apply(Auth, Auth.completeNewPassword, [cognitoUser, newPassword, []]);

    const currentUser = yield apply(Auth, Auth.currentUserInfo, []);

    yield put(loginSuccess(currentUser));
    yield put(setAuthStatus('signedIn'));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

function* handleForgotPassword(action) {
  const { username } = action.payload;
  try {
    yield apply(Auth, Auth.forgotPassword, [username]);
    yield put(setAuthStatus('resetPassword'));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

export function* handleResetPassword(action) {
  const { username, code, newPassword } = action.payload;
  try {
    yield apply(Auth, Auth.forgotPasswordSubmit, [username, code, newPassword]);
    yield put(setAuthStatus('signIn'));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

export function* handleGetCredentials() {
  try {
    const credentials = yield apply(Auth, Auth.currentUserCredentials, []);

    if (credentials) {
      yield put(setCredentials(credentials));
    }
  } catch (err) {
    console.error(err);
    if (err !== 'cannot get guest credentials when mandatory signin enabled') {
      yield put(setAuthError(errorMessage(err)));
    }
  }
}

export function* handleCreateLocationLog({ payload }) {
  try {
    const currentUser = yield apply(Auth, Auth.currentUserInfo, []);

    if (currentUser && currentUser.attributes) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          userID: currentUser.attributes.sub,
        }),
      };
      fetch(`${API_URL}/api/logs`, requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

async function fetchJson(url) {
  let resp;
  try {
    let data = await fetch(url);
    resp = { data: await data.json() };
  } catch (e) {
    resp = { err: e.message };
  }
  return resp;
}

export function* handleGetLocationLogs({ payload }) {
  try {
    const response = yield call(fetchJson, `${API_URL}/api/logs`);
    const data = response.data;

    console.log(data);

    yield put(setLocationLogs(data || []));
  } catch (err) {
    console.error(err);
    if (err !== 'cannot get guest credentials when mandatory signin enabled') {
      yield put(setAuthError(errorMessage(err)));
    }
  }
}

function* watchSearchRequest() {
  yield takeLatest(actionTypes.LOGIN, handleLogin);
  yield takeLatest(actionTypes.LOGOUT, handleLogout);
  yield takeLatest(actionTypes.FETCH_CURRENT_USER, handleFetchCurrentUser);
  yield takeLatest(actionTypes.CLEAN_AUTH_STATE, cleanAuthState);
  yield takeLatest(actionTypes.SET_NEW_PASSWORD, handleSetNewPassword);
  yield takeLatest(actionTypes.FORGOT_PASSWORD, handleForgotPassword);
  yield takeLatest(actionTypes.RESET_PASSWORD, handleResetPassword);
  yield takeLatest(actionTypes.GET_CREDENTIALS, handleGetCredentials);
  yield takeLatest(actionTypes.CREATE_LOCATION_LOG, handleCreateLocationLog);
  yield takeLatest(actionTypes.GET_LOCATION_LOGS, handleGetLocationLogs);
}

function* sagas() {
  yield all([fork(watchSearchRequest)]);
}

export default sagas;
