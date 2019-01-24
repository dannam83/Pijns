import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { sendPijn, postsFetch } from '../../actions';
import PostListItem from '../post/PostListItem';

class PostList extends Component {
  componentWillMount() {
    this.props.postsFetch();
  }

  renderRow = (post) => {
    return (
      <PostListItem post={post} redirect={this.props.redirect} />
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
          ListHeaderComponent={this.renderHeader}
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
  },
  writePostView: {
    paddingTop: 13
  }
};

function mapStateToProps(state) {
  const { user } = state;
  let posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;

    return { ...val, postId: uid, sendPijn, pijnSentToday, user, navigation };
  }).reverse();
  return { posts };
}

export default connect(mapStateToProps, { postsFetch })(PostList);
