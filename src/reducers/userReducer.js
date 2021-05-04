import { USER_AUTH, USER_RESET } from 'actions/userActions';
import createReducer from './createReducer';
import { POSTS_VOTE } from 'actions/postsActions';

const initialState = {
  name: 'Bunty Jones (You`re still logged in)',
  voted: {}
};

const actionHandlers = {
  [USER_AUTH]: (state, { payload: name }) => {
    state.name = name;
  },
  [USER_RESET]: state => {
    state.name = null;
  },
  [POSTS_VOTE]: (state, { payload: { change, postId, commentId } }) => {
    const idForVote = commentId || postId;

    if (state.voted[idForVote]) state.voted[idForVote] = undefined;
    else state.voted[idForVote] = change;
  }
};

export default createReducer(actionHandlers, initialState);
