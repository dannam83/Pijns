import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';

import PostForm from '../components/post/PostForm';
import { postEditUpdate, postEditSave, postDelete } from '../actions';
import { CardSection, ButtonAsText, Confirm } from '../components/common';

class PostEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    _.each(this.props.post, (value, prop) => {
      this.props.postEditUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { postText } = this.props;
    this.props.postEditSave({ postText, uid: this.props.post.uid });
  }

  onAccept() {
    this.props.postDelete({ uid: this.props.post.uid });
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
        <PostForm {...this.props} />
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
  const { postText, postType } = state.postEdit;
  return { postText, postType };
};

export default connect(mapStateToProps, {
  postEditUpdate, postEditSave, postDelete
})(PostEdit);
