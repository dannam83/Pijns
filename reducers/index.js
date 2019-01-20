import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import postEdit from './post_edit_reducer';
import postCreate from './post_create_reducer';
import posts from './posts_reducer';
import pijnLog from './pijn_log_reducer';
// import likedJobs from './likes_reducer';

export default combineReducers({
  auth,
  user,
  postEdit,
  postCreate,
  posts,
  pijnLog
  // likedJobs
});
