import { POST_SET_ACTIVE, POST_RESET_ACTIVE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case POST_SET_ACTIVE:
      return action.payload || {};
    case POST_RESET_ACTIVE:
      return {};
    default:
      return state;
  }
};
