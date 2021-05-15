import actionTypes from '../actions/constants';

const initialState = {
  error: undefined,
  userError: undefined,
  currentUser: undefined,
  cognitoUser: undefined,
  loggedIn: false,
  checkingAuth: false,
  authStatus: 'signIn',
  credentials: null,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT: {
      return initialState;
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.userData,
        loggedIn: true,
        error: undefined,
      };
    }
    case actionTypes.FETCH_CURRENT_USER: {
      return { ...state, checkingAuth: true };
    }
    case actionTypes.SET_AUTH_ERROR: {
      return {
        ...state,
        currentUser: undefined,
        cognitoUser: undefined,
        loggedIn: false,
        checkingAuth: false,
        error: action.payload.errorMessage,
      };
    }
    case actionTypes.SET_USER_ERROR: {
      return {
        ...state,
        checkingAuth: false,
        userError: action.payload.errorMessage,
      };
    }
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        loggedIn: true,
        checkingAuth: false,
        currentUser: action.payload.userData,
      };
    }
    case actionTypes.SET_COGNITO_USER: {
      return { ...state, cognitoUser: action.payload.cognitoUser };
    }
    case actionTypes.SET_AUTH_STATUS: {
      return {
        ...state,
        checkingAuth: false,
        authStatus: action.payload.status,
        error: undefined,
      };
    }
    case actionTypes.GET_CREDENTIALS: {
      return {
        ...state,
        credentials: null,
      };
    }
    case actionTypes.SET_CREDENTIALS: {
      return {
        ...state,
        credentials: action.payload.credentials,
      };
    }
    default: {
      return state;
    }
  }
};

export default session;
