import React, { Component } from 'react';
import { View, Text, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input } from '../components/common';
import { searchUpdate, getFriendStatus, fetchFriendList } from '../actions';

import TagFriendsListItem from '../components/post/TagFriendsListItem';

class TagFriendsList extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    const { fetchFriendList, navigation: { getParam } } = props;
    const taggedFriendsParam = getParam('taggedFriends');

    fetchFriendList(props.currentUser.uid);

    this.state = {
      searchInput: '',
      taggedFriends: { ...taggedFriendsParam } || {}
    };
  }

  onChangeText = (value) => {
    this.setState({ searchInput: value.toLowerCase() });
  }

  getTagCount = route => {
    if (route === 'postEdit') {
      return this.props.postEditTagCount;
    }
    return this.props.postCreateTagCount;
  }

  nameMatch(friend) {
    const data = friend.name ? friend : friend.user;
    const { searchInput } = this.state;
    const nameSubstring = data.name.slice(0, searchInput.length).toLowerCase();
    return nameSubstring === searchInput;
  }

  taggedFriends() {
    const { friendsLabelStyle } = styles;
    const { postEditTaggedFriends, postCreateTaggedFriends, navigation } = this.props;
    const route = navigation.getParam('route');

    const taggedFriends = route === 'postEdit'
      ? postEditTaggedFriends : postCreateTaggedFriends;

    return (
      <View>
        { this.state.searchInput === ''
          ? (
            <FlatList
              data={taggedFriends}
              renderItem={({ item }) => this.renderRow(item)}
              keyExtractor={({ item }, userId) => userId.toString()}
              keyboardShouldPersistTaps={'handled'}
            />
          )
          : null
        }
        <Text style={friendsLabelStyle}>Friends</Text>
      </View>
    );
  }

  tagFriends() {
    let searchFriends = _.filter(this.props.friendList, (friend) => {
      return this.nameMatch(friend);
    });

    return (
      <FlatList
        data={searchFriends}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, userId) => userId.toString()}
        keyboardShouldPersistTaps={'handled'}
        onScroll={Keyboard.dismiss}
        ListHeaderComponent={this.taggedFriends()}
      />
    );
  }

  renderRow = (item) => {
    const { currentUser, navigation } = this.props;
    if (item.userId === currentUser.uid) { return null; }

    const { taggedFriends } = this.state;
    const friend = item.name ? item : item.user;
    const update = navigation.getParam('update');
    const route = navigation.getParam('route');

    const inList = taggedFriends[friend.uid];
    const checked = inList && inList.tagged;

    return (
      <TagFriendsListItem
        friend={friend}
        update={update}
        route={route}
        checked={checked}
        tags={this.state.taggedFriends}
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
        {this.tagFriends()}
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
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
  },
  friendsLabelStyle: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 17,
    paddingTop: 15,
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
    postEditTagCount: postEdit.tagCount || 0,
    postCreateTaggedFriends: createFriends,
    postCreateTagCount: postCreate.tagCount || 0
  };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(TagFriendsList);
