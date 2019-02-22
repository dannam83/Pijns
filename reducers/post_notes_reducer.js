import { FETCH_POST_NOTES, NOTES_CLEAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_NOTES:
      return action.payload ? action.payload : {};
    case NOTES_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
