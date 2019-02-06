import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton } from '../components/common';
import { fetchRequests } from '../actions';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  componentWillMount() {
    this.props.fetchRequests(this.props.currentUser.uid);
  }

  goToPublicProfile = (profileUser) => {
    // const currentUserId = this.props.currentUser.uid;
    // const profileUserId = profileUser.userId;
    // const { navigate } = this.props.navigation;
    // const redirect = () => navigate('PublicProfile', { profileUser });
    //
    // this.props.friendStatus({ profileUserId, currentUserId });
    // redirect();
  };

  // onPress={() => this.goToPublicProfile(item)}
  renderRow = (item) => {
    return (
      <ListItemAsButton
        text={item.name}
        imageSource={item.picture}
      />
    );
  }

  render() {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
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
  console.log(state);
  let requests = _.map(state.requests, (val) => {
    return { ...val };
  });
  const { user } = state;
  return { requests, currentUser: user };
}

export default connect(mapStateToProps, {
  fetchRequests
})(NotificationsScreen);
