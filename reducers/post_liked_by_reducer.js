import { POST_FETCH_LIKED_BY, POST_LIKED_BY_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_FETCH_LIKED_BY:
      return action.payload;
    case POST_LIKED_BY_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
