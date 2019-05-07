import { FRIEND_STATUS, FRIEND_POSTS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { status: null, posts: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIEND_STATUS:
      return { ...state, status: action.payload };
    case FRIEND_POSTS_FETCH_SUCCESS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
