import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { sendPijn, postsFetch, fetchUserFeed } from '../../actions';
import PostListItem from './PostListItem';

class PostListFriends extends Component {
  // List data now being loaded on LoadAppScreen rather than component constructor
  // constructor(props) {
  //   super(props);
  // }
  state = { refreshing: false };

  refreshList = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchUserFeed(this.props.user.uid);
    this.setState({ refreshing: false });
  }

  showRefreshSpinner = () => {
    return this.state.refreshing ? (
      <View style={{ paddingTop: 5, paddingBottom: 15 }}>
        <ActivityIndicator />
      </View>
    ) : null;
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
    return (
      <View style={styles.writePostView}>
        {this.showRefreshSpinner()}
        <Button
          title="Search for friends!"
          onPress={() => this.props.redirect('SearchFriends')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'search' }}
        />
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
    paddingBottom: 5
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
