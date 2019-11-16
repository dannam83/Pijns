import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { Confirm } from '../common';
import ListItemMine from './ListItemMine';

const PostListMine = ({
  posts,
  redirect,
  postsFetch,
  postEditUpdate,
  postDelete,
  deleteModalVisible,
  showDeleteModal,
  hideDeleteModal,
  postId,
  header,
  userFeedMap,
}) => {
  useEffect(() => { postsFetch(); }, []);

  const renderRow = (post) => {
    return (
      <ListItemMine
        post={post}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        showDeleteModal={showDeleteModal}
        onProfile
        userFeedIndex={userFeedMap[post.postId]}
      />
    );
  };

  return (
    <View style={styles.masterContainerStyle}>
      <Confirm
        visible={deleteModalVisible}
        onDecline={hideDeleteModal}
        onAccept={() => { postDelete({ postId }); }}
      >
        Are you sure you would like to delete this post? This action cannot be reversed.
      </Confirm>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        ListHeaderComponent={header}
        keyExtractor={({ item }, postId) => postId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  iconStyle: {
    marginRight: 2
  }
});

export default PostListMine;
