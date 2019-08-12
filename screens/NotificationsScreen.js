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
      notificationStyle, bodyStyle, messageStyle, imageStyle, actionsViewStyle, xStyle
    } = styles;
    const { content, newPijns } = item;
    const pijn = newPijns === 1 ? 'pijn' : 'pijns';
    const message = `You received ${newPijns} new ${pijn} for this prayer request!`;
    const post = content.length < 90 ? content : `${content.slice(0, 90)}...`;

    return (
      <View style={notificationStyle}>
        <TouchableOpacity style={bodyStyle}>
          <Image
            style={imageStyle}
            source={require('../assets/images/pijn.png')}
          />
          <Text
            style={messageStyle}
            numberOfLines={2}
          >{message} "{post}"</Text>
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
        <View style={{ marginTop: 6 }}>
          <FlatList
            data={this.props.notifications}
            renderItem={({ item }) => this.renderNotificationRow(item)}
            keyExtractor={({ item }, postId) => postId.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    padding: 10,
  },
  notificationStyle: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 14
  },
  bodyStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageStyle: {
    height: 26,
    width: 30,
    marginLeft: 3,
    marginRight: 6
  },
  messageStyle: {
    width: SCREEN_WIDTH - 90,
    fontSize: 15
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
  notifications.sort((a, b) => a.timestamp - b.timestamp);

  const { user, friend } = state;
  return { currentUser: user, friend, requests, notifications };
}

export default connect(mapStateToProps, {
  setFriendStatus,
  acceptFriend,
  declineFriend
})(NotificationsScreen);
