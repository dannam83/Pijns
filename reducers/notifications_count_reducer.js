import { NOTIFICATIONS_COUNT } from '../actions/types';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_COUNT:
      return action.payload ? action.payload : INITIAL_STATE;
    default:
      return state;
  }
};
