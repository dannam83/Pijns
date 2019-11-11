import {
  FETCH_USER_FEED,
} from '../../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_FEED:
      if (!action.payload) { return state; }
      return action.payload.friendPostsMap || state;
    default:
      return state;
  }
};
