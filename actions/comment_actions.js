import firebase from 'firebase';
import {
  COMMENT_CREATE_SAVE,
  COMMENTS_POPULATE,
  COMMENTS_CLEAR,
  FETCH_POST_COMMENT_LIKES,
  COMMENT_LIKES_CLEAR
 } from './types';

 export const commentCreateSave = ({ user, comment, postAuthorId, postId }) => {
   const db = firebase.database();
   const postCommentsRef = db.ref(`/postComments/${postId}`);
   const key = postCommentsRef.push().getKey();

   return (dispatch) => {
     saveToFirebase(user, comment, postAuthorId, postId, key);
     dispatch({
       type: COMMENT_CREATE_SAVE,
       payload: { author: user, comment, commentId: key }
     });
   };
 };

 export const likeComment = ({
   userId, userName, commentId, postAuthorId, postId
 }) => {
   return () => {
     saveLike({ userId, userName, commentId, postAuthorId, postId });
   };
 };

 export const commentsPopulate = (postId) => {
   return (dispatch) => {
     firebase.database().ref(`/postComments/${postId}`)
       .on('value', snapshot => {
         dispatch({ type: COMMENTS_POPULATE, payload: snapshot.val() }
         );
       }
     );
   };
 };

 export const commentsClear = () => {
   return ({
     type: COMMENTS_CLEAR
   });
 };

 export const commentLikesClear = ({ userId, postId }) => {
   return (dispatch) => {
     firebase.database().ref(`/userPostCommentLikes/${userId}/${postId}`)
       .off('value', () => {
         dispatch({ type: COMMENT_LIKES_CLEAR }
         );
       }
     );
   };
 };

 export const fetchPostCommentLikes = ({ userId, postId }) => {
   return (dispatch) => {
     firebase.database().ref(`/userPostCommentLikes/${userId}/${postId}`)
       .on('value', snapshot => {
         dispatch({ type: FETCH_POST_COMMENT_LIKES, payload: snapshot.val() }
         );
       }
     );
   };
 };

 const saveToFirebase = async (author, comment, postAuthorId, postId, key) => {
   const db = firebase.database();
   const postCommentsRef = db.ref(`/postComments/${postId}`);
   const createdOn = new Date().toString();
   const timestamp = -Date.now();

   try {
     await postCommentsRef.child(key).set({
       author, comment, createdOn, timestamp, likeCount: 0, commentId: key
     });
     incrementPostCommentCount(db, postAuthorId, postId);
   } catch (err) {
     console.warn(err);
   }
 };

 const saveLike = async ({ userId, userName, commentId, postAuthorId, postId }) => {
   const db = firebase.database();
   const commentLikesRef = db.ref(
     `/commentLikes/${commentId}/likedBy/${userId}`
   );
   const userPostCommentLikesRef = db.ref(
     `/userPostCommentLikes/${userId}/${postId}/${commentId}`
   );
   const createdOn = new Date().toString();
   const timestamp = -Date.now();

   try {
     await commentLikesRef.update({ name: userName, createdOn, timestamp });
     await userPostCommentLikesRef.update({ createdOn, timestamp });
     incrementCommentLikeCount(db, commentId, postAuthorId, postId);
   } catch (err) {
     console.warn(err);
   }
 };

 const incrementCommentLikeCount = (db, commentId, postAuthorId, postId) => {
   const commentLikesRef = db.ref(
     `/commentLikes/${commentId}/likeCount`
   );
   const postCommentsRef = db.ref(
     `/postComments/${postId}/${commentId}/likeCount`
   );

   commentLikesRef.transaction((currentCount) => (currentCount || 0) + 1);
   postCommentsRef.transaction((currentCount) => (currentCount || 0) + 1);
 };

 const incrementPostCommentCount = (db, postAuthorId, postId) => {
   const postAuthorRef = db.ref(
     `/users/${postAuthorId}/posts/${postId}/commentCount`
   );
   const postsRef = db.ref(
     `/posts/${postId}/commentCount`
   );

   postAuthorRef.transaction((currentCount) => (currentCount || 0) + 1);
   postsRef.transaction((currentCount) => (currentCount || 0) + 1);
 };
