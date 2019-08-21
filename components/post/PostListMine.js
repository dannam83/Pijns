import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { ButtonAsField, Confirm } from '../common';
import PostListItem from './PostListItem';

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
  navigationTab
}) => {
  useEffect(() => { postsFetch(); }, []);

  const { writePostView, iconStyle, masterContainerStyle } = styles;

  const renderRow = (post) => {
    return (
      <PostListItem
        post={post}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        navigationTab={navigationTab}
        showDeleteModal={showDeleteModal}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={writePostView}>
        <ButtonAsField
          onPress={() => redirect('MyPosts_PostCreate')}
          iconName={'form'}
          iconRestyle={iconStyle}
        >Write a post</ButtonAsField>
      </View>
    );
  };

  return (
    <View style={masterContainerStyle}>
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

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  iconStyle: {
    marginRight: 2
  }
};

export default PostListMine;
