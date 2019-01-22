import { SAVE_NAVIGATION } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_NAVIGATION:
      return action.payload ? action.payload : {};
    default:
      return state;
  }
};
