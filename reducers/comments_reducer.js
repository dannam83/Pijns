import { COMMENTS_POPULATE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTS_POPULATE:
      return action.payload;
    default:
      return state;
  }
};
