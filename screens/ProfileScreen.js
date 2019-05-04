import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import ProfileHeaderLarge from '../components/profile/ProfileHeaderLarge';
import { friendRequest, unfriend, fetchFriendList, logout } from '../actions';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onFriendsPress = (userId) => {
    this.props.fetchFriendList(userId);
    const nav = this.props.navigation;
    const tab = nav.getParam('tab');

    if (tab === 'Friends') {
      nav.navigate('FR_Friends', { tab });
    } else if (tab === 'My') {
      nav.navigate('MY_Friends', { tab });
    } else {
      nav.navigate('Friends');
    }
  }

  render() {
    let user = this.props.navigation.getParam('profileUser');
    user = !user ? this.props.currentUser : user;

    let { name, picture, userId } = user;
    userId = !userId ? user.uid : userId;

    const { status } = this.props.friend;
    const redirect = this.props.navigation.navigate;
    const tab = this.props.navigation.getParam('tab');

    return (
      <View style={styles.containerStyle}>
        <ProfileHeaderLarge
          imgSource={{ uri: `${picture}?type=large` }}
          name={name}
          userId={userId}
          status={status}
          tab={tab}
          redirect={redirect}
          logout={this.props.logout}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  }
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList, logout
})(ProfileScreen);
