// import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { FETCH_FAVORITES } from './types';

const ROOT_URL = 'https://us-central1-pijns-dc1c1.cloudfunctions.net';

export const fetchFavorites = (userId) => {
  return (dispatch) => {
    return queryUserFavorites(userId).then(res => {
      dispatch({ type: FETCH_FAVORITES, payload: res.data });
    });
  };
};

const queryUserFavorites = (userId) => {
  return axios.post(`${ROOT_URL}/getUserFavorites`, { userId });
};
