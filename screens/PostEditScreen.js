import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';

import PostForm from '../components/post/PostForm';
import { postEditUpdate, postEditSave, postDelete } from '../actions';
import { CardSection, ButtonAsText, Confirm } from '../components/common';

class PostEdit extends Component {
  state = { showModal: false }

  // componentWillMount() {
  //   // _.each(this.props.post, (value, prop) => {
  //   //   console.log(prop, value);
  //   // });
  //   console.log(this.props);
  // }

  onButtonPress() {
    const { postText, postId } = this.props;
    this.props.postEditSave({ postText, postId });
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
  console.log(state);
  const { postId, postText, postType } = state.postEdit;
  return { postId, postText, postType };
};

export default connect(mapStateToProps, {
  postEditUpdate, postEditSave, postDelete
})(PostEdit);
