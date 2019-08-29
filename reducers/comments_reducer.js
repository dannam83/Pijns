import { COMMENTS_POPULATE, COMMENT_CREATE_SAVE, COMMENTS_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTS_POPULATE:
      return action.payload;
    case COMMENT_CREATE_SAVE:
      return state;
    case COMMENTS_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
