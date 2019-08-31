import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { PeopleListItem, PeopleList } from '../components/pijns';
import { getFriendStatus, fetchCommentLikedBy, commentLikedByClear } from '../actions';

class CommentLikesScreen extends Component {
  static navigationOptions = {
    title: 'Likes',
  };

  constructor(props) {
    super(props);
    const commentId = this.props.navigation.getParam('commentId');
    this.props.fetchCommentLikedBy(commentId);
  }

  componentWillUnmount() {
    const commentId = this.props.navigation.getParam('commentId');
    this.props.commentLikedByClear(commentId);
  }

  goToProfile = (person) => {
    const profileUserId = person.uid;
    const { uid } = this.props.currentUser;
    const { getParam, navigate, push } = this.props.navigation;
    const navigationTab = getParam('navigationTab');

    this.props.getFriendStatus({ profileUserId, currentUserId: uid });

    if (profileUserId !== uid) {
      push(`${navigationTab}_PublicProfile`, { profileUser: person, navigationTab });
    } else {
      navigate('Profile');
    }
  }

  renderRow = (person) => {
    return (
      <PeopleListItem
        person={person}
        onPress={() => this.goToProfile(person)}
      />
    );
  }

  render() {
    return (
      <PeopleList
        data={this.props.likes}
        renderItem={({ item }) => this.renderRow(item)}
        keyExtractor={({ item }, uid) => uid.toString()}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, commentLikedBy } = state;
  const likes = _.map(commentLikedBy, (val) => {
    return { ...val };
  }).sort((a, b) => a.timestamp - b.timestamp);

  return { likes, currentUser: user };
}

export default connect(mapStateToProps, {
  getFriendStatus,
  fetchCommentLikedBy,
  commentLikedByClear
})(CommentLikesScreen);
