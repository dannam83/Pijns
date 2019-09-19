import React from 'react';
import { View, FlatList } from 'react-native';
import TaggedFriendListItem from './TaggedFriendsListItem';

const TaggedFriendsList = ({ data, keyExtractor }) => {
  const renderHeaderItem = taggedFriend => {
    return (
      <TaggedFriendListItem friend={taggedFriend} />
    );
  };

  const Header = taggedFriends => {
    return (
      <FlatList
        data={taggedFriends}
        renderItem={renderHeaderItem}
        keyExtractor={keyExtractor}
      />
    );
  };

  const renderItem = friend => {
    return (
      <TaggedFriendListItem friend={friend} />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    padding: 10
  }
};

export default TaggedFriendsList;
