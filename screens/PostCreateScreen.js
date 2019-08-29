import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { postCreateSave, fetchUserFeed, fetchFriendList } from '../actions';
import { Button, ButtonAsText } from '../components/common';
import PostForm from '../components/post/PostForm';
import { disabledGray, headerButtonBlue } from '../assets/colors';

class PostCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Write a post',
      headerRight: (
        <ButtonAsText
          onPress={navigation.getParam('onSharePress')}
          editTextStyle={styles.rightButtonStyle}
        >Share</ButtonAsText>
      ),
      headerLeft: (
        <Button
          iconName={'left'}
          onPress={navigation.getParam('onBackPress')}
          buttonRestyle={styles.buttonRestyle}
          iconSize={26}
        />
      )
    };
  }

  componentDidMount() {
    const { navigation, fetchFriendList, user } = this.props;
    navigation.setParams({ onSharePress: this.onSharePress });
    navigation.setParams({ onBackPress: this.onBackPress });
    fetchFriendList(user.uid);
  }

  onSharePress = async () => {
    const {
      user, postText, author, postCreateSave, navigation, fetchUserFeed, friendList
    } = this.props;
    await postCreateSave({ postText, postType: 'prayerRequest', author, user, friendList });
    fetchUserFeed(author.id);
    navigation.navigate('UserFeed');
  }

  onBackPress = () => {
    this.props.navigation.navigate('UserFeed');
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80}
        enabled
      >
        <PostForm {...this.props} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  rightButtonStyle: {
    fontWeight: 'bold',
    color: headerButtonBlue
  },
  disabledTextStyle: {
    fontWeight: 'bold',
    color: disabledGray
  },
  buttonRestyle: {
    borderWidth: 0,
    width: 30,
    marginLeft: 1,
    marginRight: 0,
    paddingTop: 3,
  }
};

const mapStateToProps = (state) => {
  const { friendList, user } = state;
  const { postType, postText } = state.postCreate;
  const { name, picture, uid } = state.user;
  const author = { name, picture, id: uid };
  return { user, postType, postText, author, friendList };
};

export default connect(mapStateToProps, {
  postCreateSave, fetchUserFeed, fetchFriendList })(PostCreateScreen);
