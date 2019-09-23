import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, ListItemAsButton } from '../components/common';
import { searchUpdate, getFriendStatus, fetchFriendList } from '../actions';

import TagFriendsListItem from '../components/post/TagFriendsListItem';

class TagFriendsList extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    props.fetchFriendList(props.currentUser.uid);
  }

  state = { searchInput: '', taggedFriends: [] };

  onChangeText = (value) => {
    this.setState({ searchInput: value.toLowerCase() });
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

  nameMatch(friend) {
    const data = friend.name ? friend : friend.user;
    const { searchInput } = this.state;
    const nameSubstring = data.name.slice(0, searchInput.length).toLowerCase();
    return nameSubstring === searchInput;
  }

  taggedFriends() {
    const { postEditTaggedFriends, postCreateTaggedFriends, navigation } = this.props;
    const route = navigation.getParam('route');

    const taggedFriends = route === 'postEdit'
      ? postEditTaggedFriends : postCreateTaggedFriends;

    return (
      <FlatList
        data={taggedFriends}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, userId) => userId.toString()}
      />
    );
  }

  searchFriends() {
    const { friendsLabelStyle } = styles;

    let searchFriends = _.filter(this.props.friendList, (friend) => {
      return this.nameMatch(friend);
    });

    return (
      <FlatList
        data={searchFriends}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, userId) => userId.toString()}
        ListHeaderComponent={<Text style={friendsLabelStyle}>Friends</Text>}
      />
    );
  }

  renderRow = (item) => {
    const { currentUser, navigation } = this.props;
    if (item.userId === currentUser.uid) { return null; }

    const friend = item.name ? item : item.user;
    const update = navigation.getParam('update');
    const route = navigation.getParam('route');

    return (
      <TagFriendsListItem
        friend={friend}
        onPress={() => this.goToPublicProfile(friend)}
        update={update}
        route={route}
        checked={item.tagged}
      />
    );
  }

  render() {
    const { masterContainerStyle, inputViewStyle, inputStyle } = styles;

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
        {this.taggedFriends()}
        {this.searchFriends()}
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
  friendsLabelStyle: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 17,
    paddingTop: 5,
    paddingBottom: 5
  }
};

function mapStateToProps(state) {
  const { user, friendList, postEdit, postCreate } = state;
  const editFriends = _.map(postEdit.taggedFriends, (friend) => {
    return { ...friend };
  });
  const createFriends = _.map(postCreate.taggedFriends, (friend) => {
    return { ...friend };
  });
  return {
    currentUser: user,
    friendList,
    postEditTaggedFriends: editFriends,
    postCreateTaggedFriends: createFriends
  };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(TagFriendsList);
