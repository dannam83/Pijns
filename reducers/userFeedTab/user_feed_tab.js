import { combineReducers } from 'redux';
import userFeed from './user_feed_reducer';
import userFeedMap from './user_feed_map_reducer';
import searchResults from './search_reducer';

export default combineReducers({
  userFeed,
  userFeedMap,
  searchResults,
});
