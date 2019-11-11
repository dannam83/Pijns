import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import Banner from './Banner';
import Footer from './Footer';

const Post = ({ post, redirect, navigationTab, onProfile, userFeedIndex }) => {
  const {
    user, author, content, timestamp, createdOn, postId, pinned, taggedFriends,
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
        navigationTab={navigationTab}
        notes={post.notes.count}
        likes={post.likes}
        keepComments
        userFeedIndex={userFeedIndex}
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
    marginTop: 0,
    marginBottom: 2
  },
  contentStyle: {
    fontSize: 16
  }
});

export default Post;
