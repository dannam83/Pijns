import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton, PeopleList } from '../components/common';
import { searchUpdate, getFriendStatus } from '../actions';

class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
  };

  onChangeText = (value) => {
    this.props.searchUpdate({ value });
  }

  goToPublicProfile = (friend) => {
    const { navigate, getParam } = this.props.navigation;
    const navigationTab = getParam('navigationTab');

    if (navigationTab === 'FriendsPosts') {
      navigate('FriendPosts_PublicProfile', { profileUser: friend });
    } else if (navigationTab === 'MyPosts') {
      navigate('MyPosts_PublicProfile', {
        profileUser: friend, navigationTab });
    } else if (navigationTab === 'Profile') {
      navigate('Profile_PublicProfile', {
        profileUser: friend, status: 'Unfriend', navigationTab
      });
    }
  };

  renderRow = (item) => {
    return (
      <ListItemAsButton
        text={item.name}
        imageSource={item.picture}
        onPress={() => this.goToPublicProfile(item)}
      />
    );
  }

  render() {
    return (
      <PeopleList
        data={this.props.friendList}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, uid) => uid.toString()}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const friendList = _.map(state.friendList, (val) => {
    return { ...val.user };
  });
  
  return { friendList, currentUser: user };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus
})(FriendsScreen);
