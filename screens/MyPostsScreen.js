import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostListMine from '../components/post/PostListMine';
import { sendPijn, postsFetch, postEditUpdate } from '../actions';

class MyPostsScreen extends Component {
  static navigationOptions = {
    title: 'My Posts',
  };

  render() {
    const redirect = this.props.navigation.navigate;
    const { posts, postEditUpdate } = this.props;

    return (
      <PostListMine
        posts={posts}
        postEditUpdate={postEditUpdate}
        postsFetch={this.props.postsFetch}
        redirect={redirect}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  let posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, sendPijn, pijnSentToday, user, navigation
    };
  }).reverse();
  return { posts };
}

export default connect(mapStateToProps, { postsFetch, postEditUpdate })(MyPostsScreen);
