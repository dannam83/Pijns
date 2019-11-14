import {
  FETCH_USER_FEED, POST_APPEND, UPDATE_USER_FEED
} from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_FEED:
      if (!action.payload) { return state; }
      const { friendPostsArray } = action.payload;
      return friendPostsArray && friendPostsArray.length > 0 ? friendPostsArray : state;
    case POST_APPEND:
      state.unshift(action.payload);
      return state;
    case UPDATE_USER_FEED:
      const newState = { ...state };
      if (action.field === 'notes') {
        newState[action.index].notes.count = action.value;
      } else {
        newState[action.index][action.field] = action.value;
      }
      return newState;
    default:
      return state;
  }
};
