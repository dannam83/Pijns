import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, ListItemAsButton } from '../components/common';
import { searchUpdate, getFriendStatus, fetchFriendList } from '../actions';

class SearchFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    props.fetchFriendList(props.currentUser.uid);
  }

  onChangeText = (value) => {
    this.props.searchUpdate({ value });
  }

  goToPublicProfile = (profileUser) => {
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = profileUser.userId;
    const { navigate, getParam } = this.props.navigation;
    const navigationTab = getParam('navigationTab');
    if (this.props.friendList && this.props.friendList[profileUserId]) {
      navigate('FriendPosts_PublicProfile', {
        profileUser, status: 'Unfriend', navigationTab
      });
    } else {
      this.props.getFriendStatus({ profileUserId, currentUserId });
      navigate('FriendPosts_PublicProfile', { profileUser, navigationTab });
    }
  };

  renderHeader = () => {
    const { containerStyle } = styles;

    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
        containerRestyle={containerStyle}
        onChangeText={value => this.onChangeText(value)}
        autoCapitalize={'none'}
        autoFocus
      />
    );
  }

  renderRow = (item) => {
    if (item.userId === this.props.currentUser.uid) {
      return null;
    }

    return (
      <ListItemAsButton
        text={item.searchName}
        imageSource={item.picture}
        onPress={() => this.goToPublicProfile(item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.searchResults}
          renderItem={({ item }) => this.renderRow(item)}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, userId) => userId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    padding: 10
  },
  containerStyle: {
    backgroundColor: '#EAEAEA',
    borderRadius: 25
  },
};

function mapStateToProps(state) {
  let searchResults = _.map(state.searchResults, (val, userId) => {
    return { ...val, userId };
  });
  const { user, friendList } = state;
  return { searchResults, currentUser: user, friendList };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(SearchFriendsScreen);
