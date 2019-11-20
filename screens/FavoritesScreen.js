import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import FavoritePosts from '../components/post/FavoritePosts';
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
      <FavoritePosts
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
    user, pijnLog, pinboard, postLikes,
    favorites: { favoritesArray }
  } = state;
  let posts = _.map(favoritesArray, (post, index) => {
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
