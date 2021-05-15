import { GET_HEALTH } from './constants';

export const getHealth = () => (dispatch) => {
  return fetch('/api/health')
    .then((res) => res.json())
    .then((health) => dispatch({ type: GET_HEALTH, payload: health }));
};
