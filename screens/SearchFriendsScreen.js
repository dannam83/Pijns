import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, ListItemAsButton } from '../components/common';
import { searchUpdate, friendStatus } from '../actions';

class SearchFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Search for friends',
  };

  onChangeText = (value) => {
    this.props.searchUpdate({ value });
  }

  goToPublicProfile = async (profileUser) => {
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = profileUser.userId;
    const { navigate } = this.props.navigation;
    const redirect = () => navigate('PublicProfile', { profileUser });
    
    await this.props.friendStatus({ profileUserId, currentUserId });
    redirect();
  };

  renderHeader = () => {
    const { containerStyle, inputRestyle } = styles;

    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
        containerRestyle={containerStyle}
        inputRestyle={inputRestyle}
        onChangeText={value => this.onChangeText(value)}
        autoCapitalize={'none'}
        autoFocus
      />
    );
  }

  renderRow = (item) => {
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
  const { user } = state;
  return { searchResults, currentUser: user };
}

export default connect(mapStateToProps, {
  searchUpdate,
  friendStatus
})(SearchFriendsScreen);
