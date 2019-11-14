import firebase from 'firebase';
import {
  POST_SET_ACTIVE,
  POST_RESET_ACTIVE,
  POST_UNAVAILABLE,
  POST_UNAVAILABLE_CONFIRM
 } from './types';

export const fetchActivePost = (postId) => {
  return (dispatch) => {
    firebase.database().ref(`/posts/${postId}`)
      .on('value', snapshot => {
        const post = snapshot.val();
        if (!post || post.deleted) {
          dispatch({
            type: POST_UNAVAILABLE
          });
        } else {
          post.postId = postId;
          dispatch({
            type: POST_SET_ACTIVE,
            payload: { id: postId, author: post.author, post }
          });
        }
      }
    );
  };
};

export const confirmPostUnavailable = () => (
  {
    type: POST_UNAVAILABLE_CONFIRM
  }
);

export const resetActivePost = (postId) => {
  firebase.database().ref(`/posts/${postId}`).off();

  return ({
    type: POST_RESET_ACTIVE
  });
};

export const setActivePost = ({ postId, postAuthor }) => {
  return {
    type: POST_SET_ACTIVE,
    payload: { id: postId, author: postAuthor }
  };
};
