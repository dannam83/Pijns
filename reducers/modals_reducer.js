import {
  POST_UNAVAILABLE,
  POST_UNAVAILABLE_CONFIRM,
} from '../actions/types';

const INITIAL_STATE = {
  postUnavailable: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_UNAVAILABLE:
      return { ...state, postUnavailable: true };
    case POST_UNAVAILABLE_CONFIRM:
      return { ...state, postUnavailable: false };
    default:
      return state;
  }
};
