import { POST_SET_ACTIVE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_SET_ACTIVE:
      return action.payload;
    default:
      return state;
  }
};
