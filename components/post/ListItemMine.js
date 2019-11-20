import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import BannerMine from './BannerMine';
import Footer from './Footer';

const ListItemMine = ({
  post, redirect, postEditUpdate, showDeleteModal, onProfile, userFeedIndex
}) => {
  const {
    user, author, content, timestamp, createdOn, postId,
    visibleTo, taggedFriends, pinned, deleted
  } = post;
  const userId = user.uid;
  const { containerStyle, contentStyle } = styles;

  if (deleted) { return null; }

  return (
    <Card containerStyle={containerStyle}>
      <BannerMine
        author={author}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        postText={content}
        postId={postId}
        visibleTo={visibleTo}
        taggedFriends={taggedFriends}
        timestamp={timestamp}
        createdOn={createdOn}
        userId={userId}
        pinned={pinned}
        showDeleteModal={showDeleteModal}
        onProfile={onProfile}
      />

      <Text style={contentStyle}>{content}</Text>

      <Footer
        post={post}
        redirect={redirect}
        notes={post.notes.count}
        likes={post.likes}
        userFeedIndex={userFeedIndex}
        favoritesIndex={post.favoritesIndex}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  contentStyle: {
    fontSize: 14
  }
});

export default ListItemMine;
