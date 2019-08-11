import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton, Button, ButtonAsText } from '../components/common';
import { setFriendStatus, acceptFriend, declineFriend } from '../actions';
import { buttonBlue } from '../assets/colors';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  goToPublicProfile = (profileUser) => {
    const { navigate } = this.props.navigation;
    const redirect = () => navigate('Notifications_PublicProfile', {
      profileUser, navigationTab: 'Notifications' });

    this.props.setFriendStatus({ status: 'See Requests' });
    redirect();
  };

  acceptFriend = (profileUserId) => {
    const { currentUser, friend } = this.props;
    this.props.acceptFriend({ profileUserId, currentUser, friend });
  }

  declineFriend = (profileUserId) => {
    const { currentUser, friend } = this.props;
    this.props.declineFriend({ profileUserId, currentUser, friend });
  }

  renderRequestRow = (item) => {
    const {
      itemStyle, actionsViewStyle, acceptButtonStyle, acceptTextStyle, xStyle
    } = styles;
    const { name, picture, uid } = item;

    return (
      <View style={itemStyle}>
        <ListItemAsButton
          text={name}
          imageSource={picture}
          onPress={() => this.goToPublicProfile(item)}
        />
        <View style={actionsViewStyle}>
          <Button
            buttonRestyle={acceptButtonStyle}
            textRestyle={acceptTextStyle}
            onPress={() => this.acceptFriend(uid)}
          >Accept</Button>
          <ButtonAsText
            editTextStyle={xStyle}
            onPress={() => this.declineFriend(uid)}
          >x</ButtonAsText>
        </View>
      </View>
    );
  }

  renderNotificationRow = (item) => {
    const {
      itemStyle, actionsViewStyle, acceptButtonStyle, acceptTextStyle, xStyle
    } = styles;
    const { name, picture, uid } = item;

    return (
      <View style={itemStyle}>
        <ListItemAsButton
          text={name}
          imageSource={picture}
          onPress={() => this.goToPublicProfile(item)}
        />
        <View style={actionsViewStyle}>
          <Button
            buttonRestyle={acceptButtonStyle}
            textRestyle={acceptTextStyle}
            onPress={() => this.acceptFriend(uid)}
          >Accept</Button>
          <ButtonAsText
            editTextStyle={xStyle}
            onPress={() => this.declineFriend(uid)}
          >x</ButtonAsText>
        </View>
      </View>
    );
  }

  render() {
    console.log(this.props.notifications);
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderRequestRow(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
        />
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderNotificationRow(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    padding: 10,
  },
  containerStyle: {
    backgroundColor: '#EAEAEA',
    borderRadius: 25
  },
  itemStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  actionsViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  acceptButtonStyle: {
    width: 75,
    height: 25,
    backgroundColor: buttonBlue,
    borderColor: buttonBlue,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 17
  },
  acceptTextStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  xStyle: {
    paddingBottom: 2,
    fontWeight: '700',
    fontSize: 14
  },
};

function mapStateToProps(state) {
  const requests = _.map(state.requests, (val) => {
    return { ...val };
  });

  const notifications = _.map(state.notifications, (val) => {
    return { ...val };
  });

  const { user, friend } = state;
  return { currentUser: user, friend, requests, notifications };
}

export default connect(mapStateToProps, {
  setFriendStatus,
  acceptFriend,
  declineFriend
})(NotificationsScreen);
