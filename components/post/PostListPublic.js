import React from 'react';
import { View, FlatList } from 'react-native';

import ListItem from './ListItem';

const PostListPublic = ({
  header, userId, posts, redirect, status, navigationTab, onProfile
}) => {
  const anyoneCanSee = post => {
    if (post.visibleTo === 'Anyone') { return true; }
    return false;
  };

  const friendCanSee = (post) => {
    if (post.deleted) { return false; }
    if (post.visibleTo === 'Only Me') { return false; }
    if (post.visibleTo === 'Tagged Friends') {
      const { taggedFriends } = post;
      if (!taggedFriends || !taggedFriends[userId]) { return false; }
    }
    return true;
  };

  const renderRow = (post) => {
    const canSee = status && status === 'Unfriend' ? friendCanSee : anyoneCanSee;
    
    if (canSee(post)) {
      return (
        <ListItem
          post={post}
          redirect={redirect}
          navigationTab={navigationTab}
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

export default PostListPublic;
