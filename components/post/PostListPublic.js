import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';

const PostListPublic = ({
  header, userId, posts, redirect, onProfile, isFriend,
}) => {
  const anyoneCanSee = post => {
    if (post.visibleTo === 'Anyone') { return true; }
    return false;
  };

  const friendCanSee = (post) => {
    const { deleted, visibleTo, taggedFriends } = post;
    if (deleted) { return false; }
    if (visibleTo === 'Only Me') { return false; }
    if (visibleTo === 'Tagged Friends') {
      if (!taggedFriends || !taggedFriends[userId]) { return false; }
    }
    return true;
  };

  const renderRow = (post) => {
    const canSee = isFriend ? friendCanSee : anyoneCanSee;

    if (canSee(post)) {
      return (
        <ListItem
          post={post}
          redirect={redirect}
          onProfile={onProfile}
        />
      );
    }
    return null;
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

const styles = StyleSheet.create({
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff'
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5
  }
});

export default PostListPublic;
