import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostFavorites from '../components/post/PostFavorites';
import { fetchFavorites } from '../actions';

class FavoritesScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Favorites',
    };
  };

  state = {
    pinPressed: false,
  }

  render() {
    const { posts, user, navigation, fetchFavorites } = this.props;
    const redirect = navigation.navigate;

    return (
      <PostFavorites
        redirect={redirect}
        posts={posts}
        user={user}
        fetchFavorites={fetchFavorites}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    user, favorites, pijnLog, pinboard, postLikes
  } = state;
  let posts = _.map(favorites, (post, index) => {
    const pijnSentToday = !!pijnLog[post.postId];
    const pinned = !!pinboard[post.postId];
    const liked = !!postLikes[post.postId];
    const { navigation } = state;
    return {
      ...post, pijnSentToday, pinned, liked, user, navigation, index
    };
  });
  return { posts, user };
}

export default connect(mapStateToProps, { fetchFavorites })(FavoritesScreen);
