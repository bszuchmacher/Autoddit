export const POSTS_GET = 'POSTS_GET';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_FAIL = 'POSTS_GET_FAIL';
export const POSTS_ADD = 'POSTS_ADD';
export const POSTS_ADD_SUCCESS = 'POSTS_ADD_SUCCESS';
export const POSTS_ADD_FAIL = 'POSTS_ADD_FAIL';
export const POSTS_VOTE = 'POSTS_VOTE';
export const POSTS_VOTE_SUCCESS = 'POSTS_VOTE_SUCCESS';
export const POSTS_VOTE_FAIL = 'POSTS_VOTE_FAIL';
export const POSTS_COMMENT_ADD = 'POSTS_COMMENT_ADD';
export const POSTS_COMMENT_ADD_SUCCESS = 'POSTS_COMMENT_ADD_SUCCESS';
export const POSTS_COMMENT_ADD_FAIL = 'POSTS_COMMENT_ADD_FAIL';
export const POSTS_COMMENT_GET = 'POSTS_COMMENT_GET';
export const POSTS_COMMENT_GET_SUCCESS = 'POSTS_COMMENT_GET_SUCCESS';
export const POSTS_COMMENT_GET_FAIL = 'POSTS_COMMENT_GET_FAIL';

export const postsGet = () => ({
  type: POSTS_GET
});

export const postsGetSuccess = posts => ({
  type: POSTS_GET_SUCCESS,
  payload: posts
});

export const postsGetFail = err => ({
  type: POSTS_GET_FAIL,
  payload: err
});

export const postsAdd = post => ({
  type: POSTS_ADD,
  payload: post
});

export const postsAddSuccess = posts => ({
  type: POSTS_ADD_SUCCESS,
  payload: posts
});

export const postsAddFail = err => ({
  type: POSTS_ADD_FAIL,
  payload: err
});

export const postsVote = (change, postId, commentId = null) => ({
  type: POSTS_VOTE,
  payload: { change, postId, commentId }
});

export const postsVoteSuccess = () => ({
  type: POSTS_VOTE_SUCCESS
});

export const postsVoteFail = err => ({
  type: POSTS_VOTE_FAIL,
  payload: err
});

export const postsCommentAdd = (postId, commentId = null, comment) => ({
  type: POSTS_COMMENT_ADD,
  payload: { postId, commentId, comment }
});

export const postsCommentAddSuccess = (postId, comments) => ({
  type: POSTS_COMMENT_ADD_SUCCESS,
  payload: { postId, comments }
});

export const postsCommentAddFail = err => ({
  type: POSTS_COMMENT_ADD_FAIL,
  payload: err
});

export const postsCommentGet = postId => ({
  type: POSTS_COMMENT_GET,
  payload: postId
});

export const postsCommentGetSuccess = (postId, comments) => ({
  type: POSTS_COMMENT_GET_SUCCESS,
  payload: { postId, comments }
});

export const postsCommentGetFail = err => ({
  type: POSTS_COMMENT_GET_FAIL,
  payload: err
});
