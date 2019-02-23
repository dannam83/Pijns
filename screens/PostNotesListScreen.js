import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { NoteListItem, PeopleList } from '../components/common';
import { getFriendStatus, fetchPostNotes, notesClear } from '../actions';

class PostNotesListScreen extends Component {
  static navigationOptions = {
    title: 'Notes',
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId');

    this.props.fetchPostNotes({ postId });
  }

  componentWillUnmount() {
    this.props.notesClear();
  }

  goToPublicProfile = (friend) => {
    const currentUserId = this.props.currentUser.uid;
    const profileUserId = friend.uid;
    const nav = this.props.navigation;
    const tab = nav.getParam('tab');
    let redirect;

    if (tab === 'Friends') {
      redirect = () => nav.navigate('PublicProfile', {
        profileUser: friend, tab
      });
    } else if (tab === 'My') {
      redirect = () => nav.navigate('MY_PublicProfile', {
        profileUser: friend, tab
      });
    }

    this.props.getFriendStatus({ profileUserId, currentUserId });
    redirect();
  };

  renderRow = (item) => {
    return (
      <NoteListItem
        note={item}
        onPress={() => this.goToPublicProfile(item)}
      />
    );
  }

  render() {
    return (
      <PeopleList
        data={this.props.notes}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, uid) => uid.toString()}
      />
    );
  }
}

function mapStateToProps(state) {
  let notes = _.map(state.postNotes, (val) => {
    return { ...val };
  }).reverse();
  const { user } = state;
  return { notes, currentUser: user };
}

export default connect(mapStateToProps, {
  getFriendStatus,
  fetchPostNotes,
  notesClear
})(PostNotesListScreen);
