import actionTypes from '../actions/constants';

const initialState = {
  currentLocation: {},
  locationHistory: [],
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
    default: {
      return state;
    }
  }
};

export default locationReducer;
