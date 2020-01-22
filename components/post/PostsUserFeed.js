import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ButtonAsField } from '../common';
import { backgroundLightBlue } from '../../assets/colors';
import ListItem from './ListItem';
import { MessageBox } from '../specific';

const PostsUserFeed = ({ user, posts, pinPressed, redirect, fetchUserFeed }) => {
  const [refreshing, setRefreshing] = useState(false);

  const refreshList = async () => {
    setRefreshing(true);
    await fetchUserFeed(user.uid);
    setRefreshing(false);
  };

  const renderRow = (post) => {
    return (
      <ListItem
        post={post}
        redirect={redirect}
        pinFilter
      />
    );
  };

  const renderOnlyPinnedRow = (post) => {
    return (
      <ListItem
        post={post}
        redirect={redirect}
        pinFilter
        pinnedOnly
      />
    );
  };

  const renderHeader = () => {
    const { writePostView, buttonStyle } = styles;

    return (
      <View style={writePostView}>
        <ButtonAsField
          onPress={() => redirect('UserFeed_SearchFriends')}
          buttonRestyle={buttonStyle}
          iconName={'search1'}
        >Search for friends
        </ButtonAsField>
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View style={{ alignItems: 'center' }}>
      <MessageBox>
          Hi! Welcome to Pijns! This is your user feed. You'll see 
          your posts as well as your friends posts on this feed.
      </MessageBox>
      <MessageBox>
          Use the pins to save the prayer requests that you're praying 
          for and encourage friends by sending a new pijn note every day!
      </MessageBox>
      <MessageBox>
          Then use the star to mark some of your favorite prayers that 
          you want to always remember.
      </MessageBox>
      <MessageBox>
          It looks like there aren't any posts yet on your feed, so 
          try adding some friends or write a new post of your own!
      </MessageBox>
      <MessageBox>
          And remember, you can send a new pijn note every single day for 
          any prayer request. Just come back and press the pijn again!
      </MessageBox>
    </View>
  );

  if (pinPressed) {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={posts}
          renderItem={({ item }) => renderOnlyPinnedRow(item)}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={<ListEmptyComponent />}
          keyExtractor={({ item }, postId) => postId.toString()}
          onRefresh={refreshList}
          refreshing={refreshing}
          pinPressed
        />
      </View>
    );
  }

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderRow(item)}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={({ item }, postId) => postId.toString()}
        onRefresh={refreshList}
        refreshing={refreshing}
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

export default PostsUserFeed;
