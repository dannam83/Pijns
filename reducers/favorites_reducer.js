import { FETCH_FAVORITES } from '../actions/types';

const INITIAL_STATE = {
  favoritesArray: [],
  favoritesMap: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
    const { payload } = action;
      if (!payload) { return state; }
      const { favoritesArray } = action.payload;
      return favoritesArray && favoritesArray.length > 0 ? payload : state;
    // case POST_APPEND:
    //   state.unshift(action.payload);
    //   return state;
    // case UPDATE_USER_FEED:
    //   const newState = { ...state };
    //   if (action.field === 'notes') {
    //     newState[action.index].notes.count = action.value;
    //   } else {
    //     newState[action.index][action.field] = action.value;
    //   }
    //   return newState;
    default:
      return state;
  }
};
