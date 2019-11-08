import { FETCH_POST_LIKES } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_LIKES:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};