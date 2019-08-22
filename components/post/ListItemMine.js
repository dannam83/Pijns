import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

import BannerMine from './BannerMine';
import Footer from './Footer';

const ListItemMine = ({
  post, redirect, pinnedOnly, postEditUpdate, navigationTab, showDeleteModal, onProfile
}) => {
  if (pinnedOnly && !post.pinned) { return null; }

  const { user, author, content, timestamp, createdOn, postId, pinned } = post;
  const userId = user.uid;
  const { containerStyle, contentStyle } = styles;

  return (
    <Card containerStyle={containerStyle}>
      <BannerMine
        author={author}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        postText={content}
        postId={postId}
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
        pinnedOnly={pinnedOnly}
        navigationTab={navigationTab}
        notes={post.notes.count}
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

export default ListItemMine;
