import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton, Button, ButtonAsText } from '../components/common';
import { setFriendStatus, acceptFriend, declineFriend } from '../actions';
import { buttonBlue } from '../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
      requestStyle, actionsViewStyle, acceptButtonStyle, acceptTextStyle, xStyle
    } = styles;
    const { name, picture, uid } = item;

    return (
      <View style={requestStyle}>
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
      notificationStyle, imageStyle, messageStyle, messageViewStyle, actionsViewStyle, xStyle
    } = styles;
    const { content, newPijns } = item;
    const pijn = newPijns === 1 ? 'pijn' : 'pijns';
    const message = `You received ${newPijns} new ${pijn} for this prayer request.`;

    return (
      <View style={notificationStyle}>
        <TouchableOpacity style={styles.viewDetailsStyle}>
          <Image source={require('../assets/images/pijn.png')} style={imageStyle} />
          <View style={[messageViewStyle, { width: SCREEN_WIDTH - 90 }]}>
            <Text style={messageStyle}>{message} "{content}"</Text>
          </View>
        </TouchableOpacity>
        <View style={actionsViewStyle}>
          <ButtonAsText editTextStyle={xStyle}>x</ButtonAsText>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderRequestRow(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
        />
        <FlatList
          data={this.props.notifications}
          renderItem={({ item }) => this.renderNotificationRow(item)}
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    padding: 10,
  },
  viewDetailsStyle: {
    flexDirection: 'row',
  },
  notificationStyle: {
    flexDirection: 'row',
    marginBottom: 9,
    marginTop: 4
  },
  imageStyle: {
    height: 26,
    width: 30,
    marginLeft: 3
  },
  messageViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageStyle: {
  },
  requestStyle: {
    flexDirection: 'row',
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
