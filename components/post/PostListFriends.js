import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import { sendPijn, postsFetch, fetchUserFeed } from '../../actions';
import { ButtonAsField } from '../common';
import PostListItem from './PostListItem';

class PostListFriends extends Component {
  state = { refreshing: false };

  refreshList = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchUserFeed(this.props.user.uid);
    this.setState({ refreshing: false });
  }

  renderRow = (post) => {
    return (
      <PostListItem
        post={post}
        redirect={this.props.redirect}
        redirectTo='FriendPostComments'
        tab={this.props.tab}
      />
    );
  }

  renderHeader = () => {
    const { writePostView, buttonStyle } = styles;

    return (
      <View style={writePostView}>
        <ButtonAsField
          onPress={() => this.props.redirect('SearchFriends')}
          buttonRestyle={buttonStyle}
          iconName={'search1'}
        >Search for friends</ButtonAsField>
      </View>
    );
  }

  render() {
    const { posts } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={posts}
          renderItem={({ item }) => this.renderRow(item)}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, postId) => postId.toString()}
          onRefresh={this.refreshList}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 10,
  },
  buttonStyle: {
    borderRadius: 25,
  }
};

function mapStateToProps(state) {
  const { user, userFeed } = state;
  let posts = _.map(userFeed, (post, index) => {
    const pijnSentToday = !!state.pijnLog[post.postId];
    const { navigation } = state;
    return {
      ...post, sendPijn, pijnSentToday, user, navigation, index
    };
  });
  return { posts, user };
}

export default connect(mapStateToProps, { postsFetch, fetchUserFeed })(PostListFriends);
