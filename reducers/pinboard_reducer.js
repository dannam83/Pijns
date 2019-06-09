import { FETCH_PINBOARD } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PINBOARD:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};
