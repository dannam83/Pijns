import {
  FETCH_FAVORITES,
  FETCH_FAVORITES_IDS,
  UPDATE_FAVORITES,
} from '../actions/types';

const INITIAL_STATE = {
  favoritesArray: [],
  favoritesMap: {},
  favoritesIds: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
    const { payload } = action;
      if (!payload) { return state; }
      const { favoritesArray, favoritesMap } = action.payload;
      return favoritesArray && favoritesArray.length > 0
        ? { ...state, favoritesArray, favoritesMap }
        : state;
    case FETCH_FAVORITES_IDS:
      return { ...state, favoritesIds: action.payload || {} };
    // case POST_APPEND:
    //   state.unshift(action.payload);
    //   return state;
    case UPDATE_FAVORITES:
      const newState = { ...state };
      if (action.field === 'notes') {
        newState.favoritesArray[action.index].notes.count = action.value;
      } else {
        newState.favoritesArray[action.index][action.field] = action.value;
      }
      return newState;
    default:
      return state;
  }
};
