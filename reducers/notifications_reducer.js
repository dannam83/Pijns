import { FETCH_NOTIFICATIONS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};
