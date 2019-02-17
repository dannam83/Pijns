import axios from 'axios';

import { FETCH_USER_FEED, UPDATE_COMMENT_COUNT } from './types';

const ROOT_URL = 'https://us-central1-pijns-dc1c1.cloudfunctions.net';

export const fetchUserFeed = (userId) => {
  return (dispatch) => {
    queryUserFeed(userId).then(res => {
      dispatch({ type: FETCH_USER_FEED, payload: res.data });
    });
  };
};

const queryUserFeed = (userId) => {
  return axios.post(`${ROOT_URL}/getUserFeed`, { userId });
};

export const updateCommentCount = (index) => {
  return {
    type: UPDATE_COMMENT_COUNT,
    index
  };
};
