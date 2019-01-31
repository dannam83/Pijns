import { SEARCH_UPDATE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
