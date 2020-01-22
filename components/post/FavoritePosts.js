import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { backgroundLightBlue } from '../../assets/colors';
import ListItem from './ListItem';
import { MessageBox } from '../specific';

const FavoritePosts = ({ user, posts, redirect, fetchFavorites }) => {
  const [refreshing, setRefreshing] = useState(false);

  const refreshList = async () => {
    setRefreshing(true);
    await fetchFavorites(user.uid);
    setRefreshing(false);
  };

  const renderRow = (post) => {
    if (!post.favorite) {
      return null;
    }

    return (
      <ListItem
        post={post}
        redirect={redirect}
      />
    );
  };


  const ListEmptyComponent = () => (
    <View style={{ alignItems: 'center' }}>
      <MessageBox>
        This screen is for all your favorited posts!
      </MessageBox>
      <MessageBox>
        Press the star button on any post to mark it as a favorite, 
        and then you'll see that post here!
      </MessageBox>
      <MessageBox>
        You can always press the star button again to remove it 
        from this list as well.
      </MessageBox>
      <MessageBox>
        If you've already favorited any posts, try swiping down to refresh!
      </MessageBox>
    </View>
  );

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, postId) => postId.toString()}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListHeaderComponent={<View style={{ height: 5 }} />}
        ListEmptyComponent={<ListEmptyComponent />}
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

export default FavoritePosts;
