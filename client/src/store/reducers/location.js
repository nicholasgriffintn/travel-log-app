import actionTypes from '../actions/constants';

const initialState = {
  currentLocation: {},
  locationHistory: [],
  logEntries: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION: {
      return {
        ...state,
        currentLocation: {
          coords: action.payload.location?.coords,
          timestamp: action.payload.location?.timestamp,
        },
        locationHistory: [
          ...state.locationHistory,
          {
            coords: action.payload.location?.coords,
            timestamp: action.payload.location?.timestamp,
          },
        ],
      };
    }
    case actionTypes.GET_LOCATION_LOGS: {
      return {
        ...state,
        logEntries: [],
      };
    }
    case actionTypes.SET_LOCATION_LOGS: {
      return {
        ...state,
        logEntries: action.payload.locationLogs,
      };
    }
    default: {
      return state;
    }
  }
};

export default locationReducer;
