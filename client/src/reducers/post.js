import { GET_POSTS, GET_POST, POST_ERROR, CREATE_POST } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
    case CREATE_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {};
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
