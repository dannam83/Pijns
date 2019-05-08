import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import { sendPijn, friendPostsFetch, postsFetch } from '../../actions';
import PostListItem from './PostListItem';

class PostListFriend extends Component {
  constructor(props) {
    super(props);
    this.props.friendPostsFetch(props.profileUserId);
  }

  renderRow = (post) => {
    return (
      <PostListItem
        post={post}
        redirect={this.props.redirect}
        redirectTo='Comments'
        tab={this.props.tab}
      />
    );
  }

  render() {
    const { posts } = this.props;
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={posts}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, postId) => postId.toString()}
          ListHeaderComponent={this.props.header}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff'
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5
  }
};

function mapStateToProps(state) {
  const { user } = state;
  let posts = _.map(state.friend.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, sendPijn, pijnSentToday, user, navigation
    };
  }).reverse();
  return { posts };
}

export default connect(mapStateToProps, { friendPostsFetch, postsFetch })(PostListFriend);
