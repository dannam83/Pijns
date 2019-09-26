import {
  POST_EDIT_UPDATE,
  POST_SAVE_SUCCESS,
  POST_DELETE,
  POST_SHOW_DELETE_MODAL,
  POST_HIDE_DELETE_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  postId: '',
  postType: '',
  postText: '',
  visibleTo: '',
  deleteModalVisible: false,
  taggedFriends: {},
  tagCount: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_EDIT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case POST_SAVE_SUCCESS:
      return INITIAL_STATE;
    case POST_DELETE:
      return INITIAL_STATE;
    case POST_SHOW_DELETE_MODAL:
      return { ...state, deleteModalVisible: true };
    case POST_HIDE_DELETE_MODAL:
      return { ...state, deleteModalVisible: false };
    default:
      return state;
  }
};
