import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  postCreateSave, postCreateUpdate, fetchUserFeed, fetchFriendList
} from '../actions';
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
      user, postText, visibleTo, author, postCreateSave, navigation, fetchUserFeed, friendList
    } = this.props;
    const taggedFriends = this.getTagsToSave();

    await postCreateSave({
      postText, postType: 'prayerRequest', visibleTo, author, user, friendList, taggedFriends
    });
    fetchUserFeed(author.id);
    navigation.navigate('UserFeed');
  }

  onBackPress = () => {
    this.props.navigation.navigate('UserFeed');
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PostForm {...this.props} routeName={'postCreate'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = (state) => {
  const { user, postCreate, friendList } = state;
  const { name, picture, uid } = state.user;
  const author = { name, picture, id: uid };
  return { ...postCreate, user, author, friendList };
};

export default connect(mapStateToProps, {
  postCreateSave, fetchUserFeed, fetchFriendList, postUpdate: postCreateUpdate
})(PostCreateScreen);
