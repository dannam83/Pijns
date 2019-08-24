import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

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
  navigationTab
}) => {
  useEffect(() => { postsFetch(); }, []);

  const renderRow = (post) => {
    return (
      <ListItemMine
        post={post}
        redirect={redirect}
        navigationTab={navigationTab}
        postEditUpdate={postEditUpdate}
        showDeleteModal={showDeleteModal}
        onProfile
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

// const renderHeader = () => {
//   return (
//     <View style={writePostView}>
//       <ButtonAsField
//         onPress={() => redirect('MyPosts_PostCreate')}
//         iconName={'form'}
//         iconRestyle={iconStyle}
//       >Write a post</ButtonAsField>
//     </View>
//   );
// };

// writePostView: {
//   paddingTop: 10,
//   paddingBottom: 5,
//   display: 'flex',
//   flexDirection: 'row',
// },
const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  iconStyle: {
    marginRight: 2
  }
};

export default PostListMine;
