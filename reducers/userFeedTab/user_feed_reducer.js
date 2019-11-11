import {
  FETCH_USER_FEED, UPDATE_COMMENT_COUNT, UPDATE_PIJN_NOTE_COUNT, POST_APPEND, UPDATE_USER_FEED
} from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_FEED:
      if (!action.payload) { return state; }
      const { friendPostsArray } = action.payload;
      return friendPostsArray && friendPostsArray.length > 0 ? friendPostsArray : state;
    case UPDATE_COMMENT_COUNT:
      const post1 = state[action.index];
      post1.commentCount = post1.commentCount ? post1.commentCount + 1 : 1;
      return state;
    case UPDATE_PIJN_NOTE_COUNT:
      const post2 = state[action.index];
      post2.notes = post2.notes.count ? post2.notes.count + 1 : 1;
      return state;
    case POST_APPEND:
      state.unshift(action.payload);
      return state;
    case UPDATE_USER_FEED:
      const newState = { ...state };
      newState[action.index][action.field] = action.value;
      console.log('new', newState)
      return newState;
    default:
      return state;
  }
};
