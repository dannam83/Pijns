import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
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

  state = { searchInput: '' };

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

  renderRow = (item) => {
    if (item.userId === this.props.currentUser.uid) {
      return null;
    }

    const friend = item.name ? item : item.user;

    return (
      <TagFriendsListItem
        friend={friend}
        onPress={() => this.goToPublicProfile(friend)}
      />
    );
  }

  nameMatch(friend) {
    const data = friend.name ? friend : friend.user;
    const { searchInput } = this.state;
    const nameSubstring = data.name.slice(0, searchInput.length).toLowerCase();
    return nameSubstring === searchInput;
  }

  render() {
    const { masterContainerStyle, inputViewStyle, inputStyle } = styles;
    const { friendList } = this.props;

    let data = _.filter(friendList, (friend) => {
      return this.nameMatch(friend);
    });

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
  // let friendList = _.map(state.friendList, (val, userId) => {
  //   return { ...val, userId };
  // });
  const { user, friendList } = state;
  return { currentUser: user, friendList };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(TagFriendsList);
