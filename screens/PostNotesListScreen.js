import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton } from '../components/common';
import { getFriendStatus, fetchPostNotes } from '../actions';

class PostNotesListScreen extends Component {
  static navigationOptions = {
    title: 'Notes',
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId');

    this.props.fetchPostNotes({ postId });
  }

  goToPublicProfile = (friend) => {
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = friend.uid;
    const { navigate } = this.props.navigation;
    const redirect = () => navigate('FriendProfile', { profileUser: friend });

    this.props.getFriendStatus({ profileUserId, currentUserId });
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
          data={this.props.notes}
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
  let notes = _.map(state.postNotes, (val) => {
    return { ...val };
  }).reverse();
  const { user } = state;
  return { notes, currentUser: user };
}

export default connect(mapStateToProps, {
  getFriendStatus,
  fetchPostNotes
})(PostNotesListScreen);
