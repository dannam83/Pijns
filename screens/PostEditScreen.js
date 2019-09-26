import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { StackActions } from 'react-navigation';
import _ from 'lodash';

import PostForm from '../components/post/PostForm';
import { postEditUpdate, postEditSave, postDelete } from '../actions';
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
    this.props.navigation.setParams({
      onSavePress: this.onSavePress,
    });
  }

  onSavePress = () => {
    const { postText, postId, visibleTo } = this.props;
    const popAction = StackActions.pop({ n: 1 });
    const taggedFriends = this.getTagsToSave(this.props.taggedFriends);

    this.props.postEditSave({
      postText, postId, visibleTo: visibleTo || 'All Friends', taggedFriends
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={60}
        enabled
      >
        <PostForm {...this.props} routeName='postEdit' />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  editTextStyle: {
    fontWeight: 'bold',
    color: 'rgba(0,125,255,1)'
  },
  disabledTextStyle: {
    fontWeight: 'bold',
    color: '#D3D3D3'
  }
};

const mapStateToProps = state => {
  const taggedFriends = state.postEdit.taggedFriends || {};
  const { postId, postText, postType, visibleTo } = state.postEdit;
  return { postId, postText, postType, visibleTo, taggedFriends };
};

export default connect(mapStateToProps, {
  postEditSave, postDelete
})(PostEdit);
