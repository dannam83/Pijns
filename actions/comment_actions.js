import firebase from 'firebase';
import {
  COMMENT_CREATE_SAVE,
  COMMENTS_POPULATE,
  COMMENT_LIKE,
  // COMMENT_CREATE_UPDATE,
  // COMMENT_EDIT_UPDATE,
  // COMMENT_SAVE_SUCCESS,
  // COMMENT_DELETE
 } from './types';

 export const commentCreateSave = ({ user, comment, postAuthorId, postId }) => {
   return (dispatch) => {
     saveToFirebase(user, comment, postAuthorId, postId);
     dispatch({
       type: COMMENT_CREATE_SAVE,
       payload: { author: user, comment }
     });
   };
 };

 export const likeComment = ({ userId, userName, commentId, postAuthorId, postId }) => {
   return (dispatch) => {
     saveLike({ userId, userName, commentId, postAuthorId, postId });
   };
 };
 // dispatch({
 //   type: COMMENT_LIKE
 // });

 export const commentsPopulate = (comments) => {
   return ({
     type: COMMENTS_POPULATE,
     payload: comments
   });
 };

 const saveToFirebase = async (author, comment, postAuthorId, postId) => {
   const db = firebase.database();
   const userRef = db.ref(`/users/${postAuthorId}/posts/${postId}/comments`);
   const postRef = db.ref(`/posts/${postId}/comments`);
   const key = userRef.push().getKey();
   const createdOn = new Date().toString();
   const timestamp = -Date.now();

   try {
     await userRef.child(key).set({
       author, comment, createdOn, timestamp, likes: 0
     });
     await postRef.child(key).set({
       author, comment, createdOn, timestamp, likes: 0
     });
   } catch (err) {
     console.warn(err);
   }
 };

 const saveLike = async ({ userId, userName, commentId, postAuthorId, postId }) => {
   const db = firebase.database();
   const userRef = db.ref(
     `/users/${postAuthorId}/posts/${postId}/comments/${commentId}/likedBy/${userId}`
   );
   const postRef = db.ref(
     `/posts/${postId}/comments/${commentId}/likedBy/${userId}`
   );
   const createdOn = new Date().toString();
   const timestamp = -Date.now();

   try {
     await userRef.update({ name: userName, createdOn, timestamp });
     await postRef.update({ name: userName, createdOn, timestamp });
     incrementCommentLikeCount(db, commentId, postAuthorId, postId);
   } catch (err) {
     console.warn(err);
   }
 };

 const incrementCommentLikeCount = (db, commentId, postAuthorId, postId) => {
   const postAuthorRef = db.ref(
     `/users/${postAuthorId}/posts/${postId}/comments/${commentId}/likes`
   );
   const postsRef = db.ref(
     `/posts/${postId}/comments/${commentId}/likes`
   );

   postAuthorRef.transaction((currentCount) => (currentCount || 0) + 1);
   postsRef.transaction((currentCount) => (currentCount || 0) + 1);
 };

// export const commentCreateUpdate = ({ prop, value }) => {
  // const currentDate = new Date();
  // const month = currentDate.getMonth().toString();
  // const day = currentDate.getDay().toString();
  // const year = currentDate.getYear().toString();
  // const dateString = month + day + year;
  // console.log(dateString);

//   return {
//     type: COMMENT_CREATE_UPDATE,
//     payload: { prop, value }
//   };
// };

// export const commentEditUpdate = ({ prop, value }) => {
//   return {
//     type: COMMENT_EDIT_UPDATE,
//     payload: { prop, value }
//   };
// };

// export const commentEditSave = ({ commentText, commentId }) => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/comments/${commentId}`)
//       .update({ content: commentText })
//       .then(() => {
//         dispatch({ type: COMMENT_SAVE_SUCCESS });
//       });
//   };
// };
//
// export const commentDelete = ({ commentId }) => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/comments/${commentId}`)
//       .remove()
//       .then(() => {
//         dispatch({ type: COMMENT_DELETE });
//     });
//   };
// };
