import {
  POSTS_GET,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POSTS_ADD,
  POSTS_ADD_SUCCESS,
  POSTS_ADD_FAIL,
  POSTS_VOTE,
  POSTS_COMMENT_ADD,
  POSTS_COMMENT_ADD_FAIL,
  POSTS_COMMENT_ADD_SUCCESS,
  POSTS_COMMENT_GET,
  POSTS_COMMENT_GET_SUCCESS,
  POSTS_COMMENT_GET_FAIL
} from 'actions/postsActions';
import createReducer from './createReducer';

const initialState = {
  isLoading: false,
  isInit: false,
  isFull: false,
  error: null,
  data: {
    posts: [],
    comments: {}
  }
};

const actionHandlers = {
  [POSTS_GET]: state => {
    state.isInit = true;
    state.isLoading = true;
  },
  [POSTS_GET_SUCCESS]: (state, { payload: posts }) => {
    state.isLoading = false;

    if (posts.length === 0) {
      state.isFull = true;
    } else {
      state.data.posts = [...state.data.posts, ...posts];
    }
  },
  [POSTS_GET_FAIL]: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  },
  [POSTS_ADD]: state => {
    state.isLoading = true;
  },
  [POSTS_ADD_SUCCESS]: (state, { payload: posts }) => {
    state.isLoading = false;
    state.data.posts = posts;
  },
  [POSTS_ADD_FAIL]: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  },
  [POSTS_VOTE]: (state, { payload: { change, postId, commentId } }) => {
    if (commentId) {
      state.data.comments[postId].find(c => c.id === commentId).score += change;
    } else {
      state.data.posts.find(p => p.id === postId).score += change;
    }
  },
  [POSTS_COMMENT_ADD]: (state, { payload: { postId } }) => {
    if (!state.data.comments[postId]) state.data.comments[postId] = [];

    state.isLoading = true;
  },
  [POSTS_COMMENT_ADD_SUCCESS]: (state, { payload: { postId, comments } }) => {
    state.isLoading = false;
    state.data.comments[postId] = comments;
    state.data.posts.find(p => p.id === postId).commentsCount = comments.length;
  },
  [POSTS_COMMENT_ADD_FAIL]: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  },
  [POSTS_COMMENT_GET]: (state, { payload: postId }) => {
    state.isLoading = true;
    state.data.comments[postId] = [];
  },
  [POSTS_COMMENT_GET_SUCCESS]: (state, { payload: { postId, comments } }) => {
    state.isLoading = false;
    state.data.comments[postId] = comments;
  },
  [POSTS_COMMENT_GET_FAIL]: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  }
};

export default createReducer(actionHandlers, initialState);
