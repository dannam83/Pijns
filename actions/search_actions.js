import firebase from 'firebase';

import { SEARCH_UPDATE } from './types';

export const searchUpdate = ({ value }) => {
  return (dispatch) => {
    firebase.database().ref('/userSearch')
      .orderByChild('searchName')
      .startAt(value)
      .endAt(`${value}\uf8ff`)
      .limitToFirst(50)
      .once('value', snapshot => {
        dispatch({ type: SEARCH_UPDATE, payload: snapshot.val() });
      }
    );
  };
};
