import { FETCH_POST_COMMENT_LIKES, COMMENT_LIKES_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENT_LIKES:
      return action.payload;
    case COMMENT_LIKES_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
