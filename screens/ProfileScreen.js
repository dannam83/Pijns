import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileHeaderPersonal from '../components/profile/ProfileHeaderPersonal';
import { fetchFriendList, logout } from '../actions';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    const { name, picture, uid } = this.props.currentUser;
    const redirect = this.props.navigation.navigate;
    const tab = 'Friends';

    return (
      <ProfileHeaderPersonal
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={uid}
        tab={tab}
        redirect={redirect}
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
