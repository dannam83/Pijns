import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { FETCH_USER_FEED, UPDATE_USER_FEED } from './types';

const ROOT_URL = 'https://us-central1-pijns-dc1c1.cloudfunctions.net';

export const fetchUserFeed = (userId) => {
  return (dispatch) => {
    return queryUserFeed(userId).then(res => {
      const { data } = res;

      saveUserFeed(data);
      dispatch({ type: FETCH_USER_FEED, payload: res.data });
    });
  };
};

const saveUserFeed = (feed) => {
  if (feed && feed.length > 0) {
    AsyncStorage.setItem('user_feed', JSON.stringify(feed));
  }
};

const queryUserFeed = (userId) => {
  return axios.post(`${ROOT_URL}/getUserFeed`, { userId });
};

export const updateUserFeed = (index, field, value) => {
  if (index || index === 0) {
    return {
      type: UPDATE_USER_FEED,
      index,
      field,
      value,
    };
  }
  return {
    type: 'DUMMY',
  };
};
