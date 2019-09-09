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

  getOnChangeText() {
    if (this.props.routeName === 'postEdit') {
      return this.props.postEditUpdate;
    }
    return this.props.postCreateUpdate;
  }

  render() {
    const textValue = this.getTextValue();
    const onChangeText = this.getOnChangeText();
    return (
      <View style={{ backgroundColor: 'white', padding: 10, flex: 1 }}>
        <PostFormHeader user={this.props.user} />
        <TextInput
          placeholder="What would you like to share?"
          multiline
          autofocus
          ref={(input) => { this.textInput = input; }}
          value={textValue}
          onChangeText={value => onChangeText({ prop: 'postText', value })}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, postEdit, postCreate } = state;

  return {
    user,
    postEditText: postEdit.postText,
    postCreateText: postCreate.postText
  };
};

export default connect(mapStateToProps, {
  postCreateUpdate, postEditUpdate
})(PostForm);
