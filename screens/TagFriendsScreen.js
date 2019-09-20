import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, ListItemAsButton } from '../components/common';
import { searchUpdate, getFriendStatus, fetchFriendList } from '../actions';

import TagFriendsListItem from '../components/post/TagFriendsListItem';

const TagFriendsListX = ({ data, keyExtractor, friendList, searchedList }) => {
  const renderHeaderItem = friend => {
    return (
      <TagFriendsListItem friend={friend} tagged />
    );
  };

  const Header = taggedFriends => {
    return (
      <View>
        <Text>Header</Text>
        <FlatList
          data={taggedFriends}
          renderItem={renderHeaderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    );
  };

  const renderItem = friend => {
    return (
      <TagFriendsListItem friend={friend} />
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
      <Text>search</Text>
    </View>
  );
};

class TagFriendsList extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    props.fetchFriendList(props.currentUser.uid);
  }

  onChangeText = (value) => {
    this.props.searchUpdate({ value });
  }

  goToPublicProfile = (profileUser) => {
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = profileUser.userId;
    const { navigate, getParam } = this.props.navigation;
    const navigationTab = getParam('navigationTab');
    if (this.props.friendList && this.props.friendList[profileUserId]) {
      navigate('UserFeed_PublicProfile', {
        profileUser, status: 'Unfriend', navigationTab
      });
    } else {
      this.props.getFriendStatus({ profileUserId, currentUserId });
      navigate('UserFeed_PublicProfile', { profileUser, navigationTab });
    }
  };

  renderHeader = () => {
    const { inputStyle } = styles;

    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
        containerRestyle={inputStyle}
        onChangeText={value => this.onChangeText(value)}
        autoCapitalize={'none'}
        autoFocus
      />
    );
  }

  renderRow = (friend) => {
    if (friend.userId === this.props.currentUser.uid) {
      return null;
    }

    const data = friend.name ? friend : friend.user;

    return (
      <TagFriendsListItem
        friend={data}
        onPress={() => this.goToPublicProfile(friend)}
      />
    );
  }

  render() {
    const { masterContainerStyle, inputViewStyle, inputStyle } = styles;
    const { searchResults, friendList } = this.props;
    const data = searchResults[0] ? searchResults : friendList;


    return (
      <View style={masterContainerStyle}>
        <View style={inputViewStyle}>
          <Input
            iconName='search1'
            placeholder={'Search'}
            containerRestyle={inputStyle}
            onChangeText={value => this.onChangeText(value)}
            autoCapitalize={'none'}
            autoFocus
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, userId) => userId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    // flex: 1,
  },
  inputViewStyle: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
  },
  inputStyle: {
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    // height: 16
  },
};

function mapStateToProps(state) {
  console.log(state);
  let searchResults = _.map(state.searchResults, (val, userId) => {
    return { ...val, userId };
  });
  let friendList = _.map(state.friendList, (val, userId) => {
    return { ...val, userId };
  });
  const { user } = state;
  return { searchResults, currentUser: user, friendList };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(TagFriendsList);
