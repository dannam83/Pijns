import {
  FRIEND_STATUS, FRIEND_POSTS_FETCH_SUCCESS, FRIEND_CLEAR
} from '../actions/types';

const INITIAL_STATE = { status: null, posts: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIEND_STATUS:
      return { ...state, status: action.payload };
    case FRIEND_POSTS_FETCH_SUCCESS:
      return { ...state, posts: action.payload };
    case FRIEND_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
