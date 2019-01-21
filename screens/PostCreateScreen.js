import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { postCreateSave } from '../actions';
import { ButtonAsText } from '../components/common';
import PostForm from '../components/post/PostForm';

class PostCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Write a post',
      headerRight: (
        <ButtonAsText
          onPress={navigation.getParam('onSharePress')}
          editTextStyle={styles.editTextStyle}
        >Share</ButtonAsText>
      )
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onSharePress: this.onSharePress,
    });
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

const mapStateToProps = (state) => {
  const { postType, postText } = state.postCreate;
  const { name, picture, uid } = state.user;
  const author = { name, picture, id: uid };
  return { postType, postText, author };
};

export default connect(mapStateToProps, { postCreateSave })(PostCreateScreen);
