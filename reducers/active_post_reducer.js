import { POST_SET_ACTIVE, POST_RESET_ACTIVE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_SET_ACTIVE:
      return action.payload;
    case POST_RESET_ACTIVE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
