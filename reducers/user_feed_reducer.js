import { FETCH_USER_FEED, UPDATE_COMMENT_COUNT } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_FEED:
      return action.payload;
    case UPDATE_COMMENT_COUNT:
      const post = state[action.index];
      post.commentCount = post.commentCount ? post.commentCount + 1 : 1;
      return state;
    default:
      return state;
  }
};
