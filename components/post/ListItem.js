import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import Banner from './Banner';
import Footer from './Footer';

const ListItem = ({
  post, redirect, pinnedOnly, navigationTab, onProfile, updatePijnNoteCount
}) => {
  if (pinnedOnly && !post.pinned && navigationTab === 'UserFeed') { return null; }

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
        navigationTab={navigationTab}
        taggedFriends={taggedFriends}
      />

      <Text style={contentStyle}>{content}</Text>

      <Footer
        author={author}
        post={post}
        redirect={redirect}
        pinnedOnly={pinnedOnly}
        navigationTab={navigationTab}
        notes={post.notes.count}
        updatePijnNoteCount={updatePijnNoteCount}
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
