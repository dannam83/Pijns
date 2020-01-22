import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import registerForPushNotifications from '../services/push_notifications';
import PostsUserFeed from '../components/post/PostsUserFeed';
import MessagesIcon from '../components/navigation/MessagesIcon';
import { ActionButtonStill } from '../components/common';
import { MessageBox } from '../components/specific';
import { disabledGray } from '../assets/colors';
import { fetchUserFeed } from '../actions';

class UserFeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pijns',
      headerTitleStyle: {
        color: '#03A9F4',
        fontFamily: 'coiny',
        fontSize: 20,
      },
      headerRight: (
        <View style={styles.headerRightStyle}>
          <ActionButtonStill
            onPress={navigation.getParam('pinToggle')}
            iconName={'pushpino'}
            iconSize={22}
            iconStyle={navigation.getParam('headerPinStyle')}
          />
          <MessagesIcon
            name={'send'}
            size={27}
          />
        </View>
      )
    };
  };

  state = {
    pinPressed: false,
  }

  componentDidMount() {
    const { user: { uid }, posts, fetchUserFeed } = this.props;
    registerForPushNotifications(uid);
    if (posts.length === 0) fetchUserFeed(uid);

    this.props.navigation.setParams({
      pinToggle: this.pinToggle,
      headerPinStyle: styles.pinStyle
    });
  }

  pinToggle = () => {
    const { pinStyle, pinnedStyle } = styles;

    if (!this.state.pinPressed) {
      this.setState({ pinPressed: true });
      this.props.navigation.setParams({ headerPinStyle: pinnedStyle });
    } else {
      this.setState({ pinPressed: false });
      this.props.navigation.setParams({ headerPinStyle: pinStyle });
    }
  }

  render() {
    const { posts, user, navigation, fetchUserFeed } = this.props;
    const redirect = navigation.navigate;
    const { pinPressed } = this.state;

    return (
      <PostsUserFeed
        redirect={redirect}
        pinPressed={pinPressed}
        posts={posts}
        user={user}
        fetchUserFeed={fetchUserFeed}
        ListEmptyComponent={this.ListEmptyComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  emptyMessageContainer: {
    padding: 16, 
    marginHorizontal: 32, 
    marginTop: 16, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'lightgray',
    width: '86%'
  },
  emptyMessageText: {
    fontSize: 15
  },
  pinStyle: {
    marginRight: 11,
    transform: [
      { scaleX: -1 }
    ]
  },
  pinnedStyle: {
    color: disabledGray,
    marginRight: 11,
    transform: [
      { scaleX: -1 }
    ]
  },
  headerRightStyle: {
    flexDirection: 'row',
    paddingRight: 13,
    paddingBottom: 8,
  },
});

function mapStateToProps(state) {
  const {
    user, pijnLog, pinboard, postLikes,
    userFeedTab: { userFeed },
    favorites: { favoritesIds, favoritesMap },
  } = state;
  let posts = _.map(userFeed, (post, index) => {
    const { postId } = post;
    const pijnSentToday = !!pijnLog[postId];
    const pinned = !!pinboard[postId];
    const liked = !!postLikes[postId];
    const favorite = !!favoritesIds[postId];
    const favoritesIndex = favoritesMap[postId];
    const { navigation } = state;
    return {
      ...post,
      pijnSentToday,
      pinned,
      liked, 
      user,
      navigation,
      favorite,
      index,
      favoritesIndex,
    };
  });
  return { posts, user };
}

export default connect(mapStateToProps, { fetchUserFeed })(UserFeedScreen);
