import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { PeopleListItem } from '../components/peopleList';
import { PeopleList } from '../components/specific';
import { getFriendStatus, fetchPostLikedBy, clearPostLikedBy } from '../actions';

class PostLikesScreen extends Component {
  static navigationOptions = {
    title: 'Post Likes',
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId');
    this.props.fetchPostLikedBy({ postId });
    this.postId = postId;
  }

  componentWillUnmount() {
    const { postId } = this;
    this.props.clearPostLikedBy({ postId });
  }

  goToProfile = (person) => {
    const profileUserId = person.uid;
    const { uid } = this.props.currentUser;
    const { navigate, push } = this.props.navigation;

    this.props.getFriendStatus({ profileUserId, currentUserId: uid });

    if (profileUserId !== uid) {
      push('PublicProfileScreen', { profileUser: person });
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
  const { user, postLikedBy } = state;
  const likes = _.map(postLikedBy, (person) => {
    return { ...person };
  }).sort((a, b) => a.timestamp - b.timestamp);

  return { likes, currentUser: user };
}

export default connect(mapStateToProps, {
  getFriendStatus,
  fetchPostLikedBy,
  clearPostLikedBy,
})(PostLikesScreen);
