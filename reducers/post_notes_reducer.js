import { FETCH_POST_NOTES } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_NOTES:
      return action.payload ? action.payload : {};
    default:
      return state;
  }
};
