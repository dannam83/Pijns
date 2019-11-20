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
    favorites: { favoritesArray, favoritesIds },
    userFeedTab: { userFeedMap },
  } = state;
  let posts = _.map(favoritesArray, (post, index) => {
    const { postId } = post;
    const pijnSentToday = !!pijnLog[postId];
    const pinned = !!pinboard[postId];
    const liked = !!postLikes[postId];
    const favorite = !!favoritesIds[postId];
    const userFeedIndex = userFeedMap[post.postId];
    const { navigation } = state;
    return {
      ...post,
      pijnSentToday,
      pinned,
      liked,
      user,
      navigation,
      index,
      favorite,
      userFeedIndex,
    };
  });
  return { posts, user };
}

export default connect(mapStateToProps, { fetchFavorites })(FavoritesScreen);
