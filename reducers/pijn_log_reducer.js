import { FETCH_PIJN_LOG } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PIJN_LOG:
      return action.payload ? action.payload : {};
    default:
      return state;
  }
};
