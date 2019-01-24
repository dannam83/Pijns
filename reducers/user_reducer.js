import {
  USER_LOGIN,
  USER_FOUND
} from '../actions/types';

const INITIAL_STATE = {
  uid: null,
  name: null,
  picture: null,
  isNew: null
};

export default function (state = INITIAL_STATE, action) {
  const { uid, name, picture, isNew } = action;

  switch (action.type) {
    case USER_LOGIN:
      return isNew ? { uid, name, picture, isNew } : { uid, name, picture };
    case USER_FOUND:
      return isNew ? { uid, name, picture, isNew } : { uid, name, picture };
    default:
      return state;
  }
}
