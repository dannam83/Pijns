import { FRIEND_STATUS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIEND_STATUS:
      return { status: action.payload };
    default:
      return state;
  }
};
