import {
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_POPULATE,
  COMMENT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTS_FETCH_SUCCESS:
      return action.payload;
    case COMMENT_SAVE_SUCCESS:
      return [...state, action.payload];
    case COMMENTS_POPULATE:
      return action.payload;
    default:
      return state;
  }
};
