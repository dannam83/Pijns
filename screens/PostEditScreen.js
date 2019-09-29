import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { StackActions } from 'react-navigation';
import _ from 'lodash';

import PostForm from '../components/post/PostForm';
import { postEditUpdate, postEditSave, postDelete, fetchFriendList } from '../actions';
import { ButtonAsText } from '../components/common';

class PostEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit post',
      headerRight: (
        <ButtonAsText
          onPress={navigation.getParam('onSavePress')}
          editTextStyle={styles.editTextStyle}
        >Save</ButtonAsText>
      )
    };
  }

  state = { showModal: false }

  componentDidMount() {
    const { navigation, fetchFriendList, user } = this.props;
    navigation.setParams({
      onSavePress: this.onSavePress,
    });
    fetchFriendList(user.uid);
  }

  onSavePress = () => {
    const { postText, postId, visibleTo, friendList, user } = this.props;
    const popAction = StackActions.pop({ n: 1 });
    const taggedFriends = this.getTagsToSave(this.props.taggedFriends);

    this.props.postEditSave({
      postText, postId, visibleTo: visibleTo || 'All Friends', taggedFriends, friendList, user
    });
    this.props.navigation.dispatch(popAction);
  }

  onAccept() {
    this.props.postDelete({ uid: this.props.postId });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  getTagsToSave = () => {
    const { taggedFriends } = this.props;
    const tagsToSave = {};

    _.forEach(taggedFriends, (friend) => {
      const { name, picture, uid, tagged } = friend;
      if (tagged) { tagsToSave[uid] = { name, picture, uid }; }
    });

    return tagsToSave;
  }

  showConfirmModal() {
    return (() => this.setState({ showModal: true }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PostForm {...this.props} routeName='postEdit' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editTextStyle: {
    fontWeight: 'bold',
    color: 'rgba(0,125,255,1)'
  },
  disabledTextStyle: {
    fontWeight: 'bold',
    color: '#D3D3D3'
  }
});

const mapStateToProps = state => {
  const { user, postEdit, friendList } = state;
  const taggedFriends = postEdit.taggedFriends || {};
  return { ...postEdit, user, taggedFriends, friendList };
};

export default connect(mapStateToProps, {
  postEditSave, postUpdate: postEditUpdate, postDelete, fetchFriendList
})(PostEdit);
