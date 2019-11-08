import firebase from 'firebase';
import { FETCH_POST_LIKES } from './types';

export const fetchPostLikes = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/userPostLikes/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_POST_LIKES, payload: snapshot.val() }
        );
      }
    );
  };
};
