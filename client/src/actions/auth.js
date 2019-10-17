import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config); // he can't see the path for some reason

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      // No need for payload, because in reducer, just setting the token to null
      type: REGISTER_FAIL
    });
  }
};
