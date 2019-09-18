import {
  POST_UNAVAILABLE,
  POST_UNAVAILABLE_CONFIRM,
  SHOW_VISIBLE_TO_MODAL,
  HIDE_VISIBLE_TO_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  postUnavailable: false,
  visibleTo: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_UNAVAILABLE:
      return { ...state, postUnavailable: true };
    case POST_UNAVAILABLE_CONFIRM:
      return { ...state, postUnavailable: false };
    case SHOW_VISIBLE_TO_MODAL:
      return { ...state, visibleTo: true };
    case HIDE_VISIBLE_TO_MODAL:
      return { ...state, visibleTo: false };
    default:
      return INITIAL_STATE;
  }
};
