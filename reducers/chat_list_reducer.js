import { FETCH_CHAT_LIST, CHAT_LIST_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_LIST:
      return action.payload;
    case CHAT_LIST_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
