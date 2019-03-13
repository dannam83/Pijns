import { FETCH_CHAT, CHAT_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT:
      return action.payload;
    case CHAT_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
