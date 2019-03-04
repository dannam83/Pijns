import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import postEdit from './post_edit_reducer';
import postCreate from './post_create_reducer';
import posts from './posts_reducer';
import activePost from './active_post_reducer';
import comments from './comments_reducer';
import postCommentLikes from './post_comment_likes_reducer';
import pijnLog from './pijn_log_reducer';
import postNotes from './post_notes_reducer';
import searchResults from './search_reducer';
import requests from './requests_reducer';
import friend from './friend_reducer';
import friendList from './friend_list_reducer';
import userFeed from './user_feed_reducer';
import navigation from './navigation_reducer';

export default combineReducers({
  auth,
  user,
  activePost,
  comments,
  friend,
  friendList,
  navigation,
  pijnLog,
  postCommentLikes,
  postCreate,
  postEdit,
  postNotes,
  posts,
  requests,
  searchResults,
  userFeed
});
