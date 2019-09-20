import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import TaggedFriendsListItem from './TaggedFriendsListItem';

const TaggedFriendsList = ({ data, keyExtractor, friendList, searchedList }) => {
  const [allFriends, setAllFriends] = useState({});
  const [searchFriends, setSearchFriends] = useState({});

  useEffect(() => {
    const friends = _.map(friendList, (val, userId) => {
      return { ...val, userId };
    });
    setAllFriends(friends);
  }, []);

  useEffect(() => {
    const friends = _.map(searchedList, (val, userId) => {
      return { ...val, userId };
    });
    setSearchFriends(friends);
  }, [searchFriends]);

  const friends = searchFriends[0] ? searchFriends : allFriends;

  const renderHeaderItem = friend => {
    return (
      <TaggedFriendsListItem friend={friend} tagged />
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
      <TaggedFriendsListItem friend={friend} />
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={Header}
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
