import { GET_HEALTH } from '../actions/constants';

const basicReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_HEALTH:
      return payload;
    default:
      return state;
  }
};

export default basicReducer;
