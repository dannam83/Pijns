import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import Banner from './Banner';
import Footer from './Footer';

const ListItem = ({ post, redirect, pinnedOnly, pinFilter, onProfile }) => {
  if (pinnedOnly && !post.pinned && pinFilter) { return null; }

  const {
    user, author, content, timestamp, createdOn,
    postId, pinned, visibleTo, taggedFriends,
  } = post;

  const userId = user.uid;

  const { containerStyle, contentStyle } = styles;

  return (
    <Card containerStyle={containerStyle}>
      <Banner
        author={author}
        redirect={redirect}
        postText={content}
        postId={postId}
        visibleTo={visibleTo}
        timestamp={timestamp}
        createdOn={createdOn}
        userId={userId}
        pinned={pinned}
        onProfile={onProfile}
        taggedFriends={taggedFriends}
      />

      <Text style={contentStyle}>{content}</Text>

      <Footer
        post={post}
        redirect={redirect}
        notes={post.notes.count}
        likes={post.likes}
        author={author}
        pinnedOnly={pinnedOnly}
        userFeedIndex={post.index}
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

export default ListItem;
