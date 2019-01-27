import {
  COMMENTS_POPULATE,
  COMMENT_CREATE_SAVE
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENT_CREATE_SAVE:
      return [...state, action.payload];
    case COMMENTS_POPULATE:
      return action.payload;
    default:
      return state;
  }
};
