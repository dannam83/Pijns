import { FETCH_FRIEND_LIST } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIEND_LIST:
      return action.payload;
    default:
      return state;
  }
};
