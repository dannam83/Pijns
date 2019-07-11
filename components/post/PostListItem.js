import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

import PostListItemBanner from './PostListItemBanner';
import PostListItemFooter from './PostListItemFooter';

const PostListItem = ({
  post, redirect, redirectTo, pinnedOnly, tab, postEditUpdate
}) => {
  if (pinnedOnly && !post.pinned) { return null; }

  const { user, author, content, timestamp, createdOn, postId, pinned } = post;
  const userId = user.uid;
  const { containerStyle, contentStyle } = styles;

  return (
    <Card containerStyle={containerStyle}>
      <PostListItemBanner
        author={author}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        postText={content}
        postId={postId}
        timestamp={timestamp}
        createdOn={createdOn}
        userId={userId}
        pinned={pinned}
      />

      <Text style={contentStyle}>{content}</Text>

      <PostListItemFooter
        post={post}
        redirect={redirect}
        redirectTo={redirectTo}
        tab={tab}
        pinnedOnly={pinnedOnly}
      />
    </Card>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  contentStyle: {
    fontSize: 16
  }
};

export default PostListItem;
