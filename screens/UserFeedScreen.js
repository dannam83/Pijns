import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostsUserFeed from '../components/post/PostsUserFeed';
import { ActionButtonStill } from '../components/common';
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
        <ActionButtonStill
          onPress={navigation.getParam('pinToggle')}
          iconName={'pushpino'}
          iconSize={22}
          iconStyle={navigation.getParam('headerPinStyle')}
        />
      )
    };
  };

  state = {
    pinPressed: false,
  }

  componentDidMount() {
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
        navigationTab='UserFeed'
        fetchUserFeed={fetchUserFeed}
      />
    );
  }
}

const styles = {
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
};

function mapStateToProps(state) {
  const { user, userFeed, pijnLog, pinboard } = state;
  let posts = _.map(userFeed, (post, index) => {
    const pijnSentToday = !!pijnLog[post.postId];
    const pinned = !!pinboard[post.postId];
    const { navigation } = state;
    return {
      ...post, pijnSentToday, pinned, user, navigation, index
    };
  });

  return { posts, user };
}

export default connect(mapStateToProps, { fetchUserFeed })(UserFeedScreen);