import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import postEdit from './post_edit_reducer';
import postCreate from './post_create_reducer';
import posts from './posts_reducer';
import activePost from './active_post_reducer';
import comments from './comments_reducer';
import commentsPostId from './comments_post_id_reducer';
import commentLikedBy from './comment_liked_by_reducer';
import postCommentLikes from './post_comment_likes_reducer';
import pijnLog from './pijn_log_reducer';
import pinboard from './pinboard_reducer';
import postNotes from './post_notes_reducer';
import postLikes from './post_likes_reducer';
// import searchResults from './search_reducer';
import requests from './requests_reducer';
import friend from './friend_reducer';
import friendList from './friend_list_reducer';
// import userFeed from './user_feed_reducer';
import navigation from './navigation_reducer';
import chat from './chat_reducer';
import chatList from './chat_list_reducer';
import notifications from './notifications_reducer';
import notificationsCount from './notifications_count_reducer';
import messagesCount from './messages_count_reducer';
import modals from './modals_reducer';
import userFeedTab from './userFeedTab/user_feed_tab';

export default combineReducers({
  auth,
  user,
  activePost,
  comments,
  commentsPostId,
  commentLikedBy,
  friend,
  friendList,
  navigation,
  pijnLog,
  pinboard,
  postCommentLikes,
  postCreate,
  postEdit,
  postNotes,
  postLikes,
  posts,
  requests,
  // searchResults,
  // userFeed,
  chat,
  chatList,
  messagesCount,
  notifications,
  notificationsCount,
  modals,
  userFeedTab
});
