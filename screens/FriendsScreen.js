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
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = friend.uid;
    const nav = this.props.navigation;
    const tab = nav.getParam('tab');
    let redirect;

    if (tab === 'Friends') {
      redirect = () => nav.navigate('PublicProfile', { profileUser: friend });
    } else {
      redirect = () => nav.navigate('FriendProfile', { profileUser: friend });
    }

    this.props.getFriendStatus({ profileUserId, currentUserId });
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
