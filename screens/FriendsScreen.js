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
    let redirect;

    if (navigationTab === 'FriendsPosts') {
      redirect = () => navigate('PublicProfile', { profileUser: friend });
    } else if (navigationTab === 'MyPosts') {
      redirect = () => navigate('MY_PublicProfile', {
        profileUser: friend, navigationTab: 'MyPosts' });
    } else if (navigationTab === 'MyProfile') {
      redirect = () => navigate('FriendProfile', {
        profileUser: friend, status: 'Unfriend', navigationTab
      });
    }

    redirect();
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
  let friendList = _.map(state.friendList, (val) => {
    return { ...val.user };
  });
  const { user } = state;
  return { friendList, currentUser: user };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus
})(FriendsScreen);
