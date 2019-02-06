import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton } from '../components/common';
import { fetchRequests, setFriendStatus } from '../actions';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  componentWillMount() {
    this.props.fetchRequests(this.props.currentUser.uid);
  }

  goToPublicProfile = (profileUser) => {
    const { navigate } = this.props.navigation;
    const redirect = () => navigate('PublicProfile', { profileUser });

    this.props.setFriendStatus({ status: 'See Requests' });
    redirect();
  };

  renderRow = (item) => {
    return (
      <ListItemAsButton
        text={item.name}
        imageSource={item.picture}
        onPress={() => this.goToPublicProfile(item)}
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
  fetchRequests,
  setFriendStatus
})(NotificationsScreen);
