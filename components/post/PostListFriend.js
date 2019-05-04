import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { sendPijn, friendPostsFetch, postsFetch } from '../../actions';
import PostListItem from './PostListItem';

class PostListFriend extends Component {
  constructor(props) {
    super(props);
    this.props.postsFetch();
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

  renderHeader = () => {
    return (
      <View style={styles.writePostView}>
        <Button
          title="Write a post!"
          onPress={() => this.props.redirect('PostCreate')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'create' }}
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
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
    paddingTop: 5
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5
  }
};

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

export default connect(mapStateToProps, { friendPostsFetch, postsFetch })(PostListFriend);
