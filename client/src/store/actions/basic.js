import { GET_HEALTH, API_URL } from './constants';

export const getHealth = () => (dispatch) => {
  return fetch(`${API_URL}/api/health`)
    .then((res) => res.json())
    .then((health) => dispatch({ type: GET_HEALTH, payload: health }));
};
