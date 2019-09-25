import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { postCreateUpdate, postEditUpdate } from '../../actions';
import PostFormHeader from './PostFormHeader';

class PostForm extends Component {
  componentDidMount() {
    this.textInput.focus();
  }

  getTextValue() {
    if (this.props.routeName === 'postEdit') {
      return this.props.postEditText;
    }
    return this.props.postCreateText;
  }

  getVisibleTo = () => {
    if (this.props.routeName === 'postEdit') {
      return this.props.postEditVisibleTo || 'All Friends';
    }
    return this.props.postCreateVisibleTo || 'All Friends';
  }

  getTaggedFriends = () => {
    if (this.props.routeName === 'postEdit') {
      return this.props.postEditTaggedFriends || {};
    }
    return this.props.postCreateTaggedFriends || {};
  }

  update = () => {
    if (this.props.routeName === 'postEdit') {
      return this.props.postEditUpdate;
    }
    return this.props.postCreateUpdate;
  }

  render() {
    const textValue = this.getTextValue();
    const taggedFriends = this.getTaggedFriends();
    const update = this.update();
    const { user, postId, routeName, navigation: { navigate } } = this.props;
    console.log('tf', taggedFriends)
    return (
      <View style={{ backgroundColor: 'white', padding: 10, flex: 1 }}>
        <PostFormHeader
          user={user}
          visibleTo={this.getVisibleTo()}
          postId={postId}
          route={routeName}
          redirect={navigate}
          taggedFriends={taggedFriends}
          update={update}
        />
        <TextInput
          placeholder="What would you like to share?"
          multiline
          autofocus
          ref={(input) => { this.textInput = input; }}
          value={textValue}
          onChangeText={value => update({ prop: 'postText', value })}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  const { user, postEdit, postCreate } = state;

  return {
    user,
    postEditText: postEdit.postText,
    postEditVisibleTo: postEdit.visibleTo,
    postEditTaggedFriends: postEdit.taggedFriends,
    postCreateText: postCreate.postText,
    postCreateVisibleTo: postCreate.visibleTo,
    postCreateTaggedFriends: postCreate.taggedFriends
  };
};

export default connect(mapStateToProps, {
  postCreateUpdate, postEditUpdate
})(PostForm);
