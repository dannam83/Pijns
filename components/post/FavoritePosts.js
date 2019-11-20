import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { backgroundLightBlue } from '../../assets/colors';
import ListItem from './ListItem';

const PostFavorites = ({ user, posts, redirect, fetchFavorites }) => {
  const [refreshing, setRefreshing] = useState(false);

  const refreshList = async () => {
    setRefreshing(true);
    await fetchFavorites(user.uid);
    setRefreshing(false);
  };

  const renderRow = (post) => {
    return (
      <ListItem
        post={post}
        redirect={redirect}
      />
    );
  };

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, postId) => postId.toString()}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListHeaderComponent={<View style={{ height: 5 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainerStyle: {
    flex: 1,
    backgroundColor: backgroundLightBlue,
  },
  writePostView: {
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 10,
  },
  buttonStyle: {
    borderRadius: 25,
  }
});

export default PostFavorites;
