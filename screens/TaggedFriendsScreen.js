import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton } from '../components/common';
import { PeopleList } from '../components/specific';
import { getFriendStatus } from '../actions';

class TaggedFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Tagged Friends',
  };

  goToProfile = (note) => {
    const profileUserId = note.uid;
    const { uid } = this.props.currentUser;
    const { getParam, navigate, push } = this.props.navigation;
    const navigationTab = getParam('navigationTab');

    this.props.getFriendStatus({ profileUserId, currentUserId: uid });

    if (profileUserId !== uid) {
      push('PublicProfileScreen', { profileUser: note, navigationTab });
    } else {
      navigate('Profile');
    }
  }

  renderRow = (item) => {
    if (item.userId === this.props.currentUser.uid) {
      return null;
    }

    return (
      <ListItemAsButton
        text={item.name}
        imageSource={item.picture}
        onPress={() => this.goToProfile(item)}
      />
    );
  }

  render() {
    const taggedFriends = this.props.navigation.getParam('taggedFriends');
    const tagged = _.map(taggedFriends, (val) => {
      return { ...val };
    }).sort((a, b) => a.name - b.name);

    return (
      <PeopleList
        data={tagged}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, uid) => uid.toString()}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return { currentUser: user };
}

export default connect(mapStateToProps, { getFriendStatus })(TaggedFriendsScreen);
