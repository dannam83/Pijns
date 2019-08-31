import { FETCH_CHAT_LIST } from '../actions/types';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_LIST:
      const keys = Object.keys(action.payload);
      let totalUnread = 0;
      keys.forEach(key => {
        if (action.payload[key].unread) {
          totalUnread += action.payload[key].unread;
        }
      });
      return totalUnread;
    default:
      return state;
  }
};
