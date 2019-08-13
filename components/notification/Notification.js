import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import { ButtonAsText } from '../../components/common';
import { zeroPijnNotification } from '../../api/notifications';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = ({ item, navigation, navigationTab, currentUser }) => {
  const {
    containerStyle, bodyStyle, messageStyle, imageStyle, actionsViewStyle, xStyle
  } = styles;
  const { content, newPijns, postId } = item;
  const pijn = newPijns === 1 ? 'pijn' : 'pijns';
  const message = `You received ${newPijns} new ${pijn} for this prayer request!`;
  const post = content.length < 90 ? content : `${content.slice(0, 90)}...`;

  const goToPostNotes = async () => {
    navigation.navigate(`${navigationTab}_Notes`, {
      user: currentUser,
      postAuthorId: currentUser.uid,
      postId,
      navigationTab
    });
  };

  return (
    newPijns === 0 ? (
      null
    ) : (
      <View style={containerStyle}>
        <TouchableOpacity style={bodyStyle} onPress={goToPostNotes}>
          <Image
            style={imageStyle}
            source={require('../../assets/images/pijn.png')}
          />
          <Text
            style={messageStyle}
            numberOfLines={2}
          >{message} "{post}"</Text>
        </TouchableOpacity>
        <View style={actionsViewStyle}>
          <ButtonAsText
            editTextStyle={xStyle}
            onPress={() => zeroPijnNotification(currentUser.uid, postId)}
          >x</ButtonAsText>
        </View>
      </View>
    )
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 14
  },
  bodyStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageStyle: {
    height: 26,
    width: 30,
    marginLeft: 3,
    marginRight: 6
  },
  messageStyle: {
    width: SCREEN_WIDTH - 90,
    fontSize: 15
  },
  actionsViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  xStyle: {
    paddingBottom: 2,
    fontWeight: '700',
    fontSize: 14
  },
};

export default Notification;
