import React, { Component } from 'react';
import { KeyboardAvoidingView, Button } from 'react-native';
import { connect } from 'react-redux';

import { postCreateSave } from '../actions';
import { CardSection, ButtonAsText } from '../components/common';
import PostForm from '../components/post/PostForm';

class PostCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Write a post',
      headerRight: (
        <Button
          onPress={navigation.getParam('onSharePress')}
          title="Share"
          color="rgba(0,125,255,1)"
        />
      )
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSharePress: this.onSharePress });
  }

  onSharePress = () => {
    const { postText, author } = this.props;
    this.props.postCreateSave({ postText, author });
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled keyboardVerticalOffset={80}
      >
        <PostForm {...this.props} />
      </KeyboardAvoidingView>
    );
  }
}
// <CardSection style={{ justifyContent: 'center', borderWidth: 0 }}>
//   <ButtonAsText onPress={this.onButtonPress}>
//     Share
//   </ButtonAsText>
// </CardSection>

const mapStateToProps = (state) => {
  const { postType, postText } = state.postCreate;
  const { name, picture, uid } = state.user;
  const author = { name, picture, id: uid };
  return { postType, postText, author };
};

export default connect(mapStateToProps, { postCreateSave })(PostCreateScreen);
