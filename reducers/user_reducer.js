import {
  USER_LOGIN
} from '../actions/types';

const INITIAL_STATE = {
  name: null,
  picture: null,
  isNew: null
};

export default function (state = INITIAL_STATE, action) {
  const { name, picture, isNew } = action;

  switch (action.type) {
    case USER_LOGIN:
      return { name, picture, isNew };
    default:
      return state;
  }
}
