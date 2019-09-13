import {
  SHOW_VISIBLE_TO_MODAL,
  HIDE_VISIBLE_TO_MODAL,
} from './types';

export const showVisibleToModal = () => {
  return ({ type: SHOW_VISIBLE_TO_MODAL });
};

export const hideVisibleToModal = () => {
  return ({ type: HIDE_VISIBLE_TO_MODAL });
};
