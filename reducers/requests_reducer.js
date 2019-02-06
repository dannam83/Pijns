import { FETCH_REQUESTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return action.payload;
    default:
      return state;
  }
};
