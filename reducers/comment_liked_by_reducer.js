import { FETCH_COMMENT_LIKED_BY, COMMENT_LIKED_BY_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENT_LIKED_BY:
      return action.payload;
    case COMMENT_LIKED_BY_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
