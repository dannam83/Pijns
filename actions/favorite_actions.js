// import { AsyncStorage } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';

import {
  FETCH_FAVORITES, FETCH_FAVORITES_IDS, UPDATE_FAVORITES,
} from './types';

const ROOT_URL = 'https://us-central1-pijns-dc1c1.cloudfunctions.net';

export const fetchFavorites = (userId) => {
  return (dispatch) => {
    return queryUserFavorites(userId).then(res => {
      dispatch({ type: FETCH_FAVORITES, payload: res.data });
    });
  };
};

export const fetchFavoritesIds = (userId) => {
  return (dispatch) => {
    firebase.database().ref(`/userFavorites/${userId}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_FAVORITES_IDS, payload: snapshot.val() }
        );
      }
    );
  };
};

export const updateFavorites = (index, field, value) => {
  if (index || index === 0) {
    return {
      type: UPDATE_FAVORITES,
      index,
      field,
      value,
    };
  }
  return {
    type: 'DUMMY',
  };
};

const queryUserFavorites = (userId) => {
  return axios.post(`${ROOT_URL}/getUserFavorites`, { userId });
};
