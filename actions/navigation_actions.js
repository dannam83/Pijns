import { SAVE_NAVIGATION } from './types';

export const saveNavigation = (navigation) => {
  return {
    type: SAVE_NAVIGATION,
    payload: navigation
  };
};
