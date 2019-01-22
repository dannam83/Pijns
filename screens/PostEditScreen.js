import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { StackActions } from 'react-navigation';

import PostForm from '../components/post/PostForm';
import { postEditUpdate, postEditSave, postDelete } from '../actions';
import { CardSection, ButtonAsText, Confirm } from '../components/common';

class PostEdit extends Component {
  state = { showModal: false }

  onButtonPress = async () => {
    const { postText, postId } = this.props;
    const popAction = StackActions.pop({ n: 1 });
    
    await this.props.postEditSave({ postText, postId });
    this.props.navigation.dispatch(popAction);
  }

  onAccept() {
    this.props.postDelete({ uid: this.props.postId });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  showConfirmModal() {
    return (() => this.setState({ showModal: true }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <PostForm postEditText={this.props.postText} routeName='postEdit' />
        <CardSection style={{ justifyContent: 'space-around', borderTopWidth: 1 }}>
          <ButtonAsText
            onPress={this.showConfirmModal()}
          >
            Delete
          </ButtonAsText>
          <ButtonAsText
            onPress={this.onButtonPress.bind(this)}
            style={{ borderLeft: 1, borderColor: '#ddd' }}
          >
            Save
          </ButtonAsText>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure? Once it's gone, it's gone forever.
        </Confirm>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const { postId, postText, postType } = state.postEdit;
  return { postId, postText, postType, navigation: state.navigation };
};

export default connect(mapStateToProps, {
  postEditUpdate, postEditSave, postDelete
})(PostEdit);
