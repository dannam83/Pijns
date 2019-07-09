import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileHeaderPersonal from '../components/profile/ProfileHeaderPersonal';
import { fetchFriendList, logout } from '../actions';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    const { currentUser, navigation } = this.props;
    const { name, picture, uid } = currentUser;

    return (
      <ProfileHeaderPersonal
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={uid}
        navigation={navigation}
        fetchFriendList={this.props.fetchFriendList}
        logout={this.props.logout}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  fetchFriendList, logout
})(ProfileScreen);
