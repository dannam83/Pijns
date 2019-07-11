import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import { sendPijn, postsFetch, postEditUpdate } from '../../actions';
import { ButtonAsField } from '../common';
import PostListItem from './PostListItem';

class PostListMine extends Component {
  constructor(props) {
    super(props);
    this.props.postsFetch();
  }

  renderRow = (post) => {
    const { redirect, tab, postEditUpdate } = this.props;

    return (
      <PostListItem
        post={post}
        redirect={redirect}
        redirectTo='Comments'
        tab={tab}
        postEditUpdate={postEditUpdate}
      />
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.writePostView}>
        <ButtonAsField
          onPress={() => this.props.redirect('PostCreate')}
          iconName={'form'}
          iconRestyle={styles.iconStyle}
        >Write a post</ButtonAsField>
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
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  iconStyle: {
    marginRight: 2
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

export default connect(mapStateToProps, { postsFetch, postEditUpdate })(PostListMine);
