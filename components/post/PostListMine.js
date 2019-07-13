import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { ButtonAsField } from '../common';
import PostListItem from './PostListItem';

const PostListMine = ({ posts, redirect, postsFetch, postEditUpdate }) => {
  useEffect(() => { postsFetch(); }, []);

  const { writePostView, iconStyle, masterContainerStyle } = styles;

  const renderRow = (post) => {
    return (
      <PostListItem
        post={post}
        redirect={redirect}
        postEditUpdate={postEditUpdate}
        navigationTab='MyPosts'
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={writePostView}>
        <ButtonAsField
          onPress={() => redirect('PostCreate')}
          iconName={'form'}
          iconRestyle={iconStyle}
        >Write a post</ButtonAsField>
      </View>
    );
  };

  return (
    <View style={masterContainerStyle}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        ListHeaderComponent={renderHeader}
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
