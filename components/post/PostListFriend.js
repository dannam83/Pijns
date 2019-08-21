import React from 'react';
import { View, FlatList } from 'react-native';

import ListItem from './ListItem';

const PostListFriend = ({
  posts, header, redirect, tab, navigationTab, onProfile
}) => {
  const renderRow = (post) => {
    return (
      <ListItem
        post={post}
        redirect={redirect}
        redirectTo='Comments'
        tab={tab}
        navigationTab={navigationTab}
        onProfile={onProfile}
      />
    );
  };

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, postId) => postId.toString()}
        ListHeaderComponent={header}
      />
    </View>
  );
};

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

export default PostListFriend;
