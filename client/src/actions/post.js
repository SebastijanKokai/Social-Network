import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CREATE_POST,
  POST_REMOVE,
  UPDATE_LIKES,
  CREATE_COMMENT,
  DELETE_COMMENT
} from './types';

// Get all posts
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a post
export const getPost = postID => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postID}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a post
export const createPost = text => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', text, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete a post
export const deletePost = postID => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({
      type: POST_REMOVE,
      payload: postID
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a like
export const addLike = postID => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove a like
export const removeLike = postID => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a comment
export const addComment = (postID, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${postID}`, text, config);
    dispatch({
      type: CREATE_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete a comment
export const deleteComment = (postID, commentID) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentID
    });

    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
