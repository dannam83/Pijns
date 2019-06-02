import React from 'react';
import { Text, View, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { ActionButton, ActionButtonStill } from '../common';
import { displayTimeAgo } from '../../functions/common';
import { pinPost } from '../../actions';

const PostListItemBanner = ({
  userId, author, redirect, postEditUpdate, postText, postId, timestamp, createdOn
}) => {
  const { id, name, picture } = author;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorStyle,
    headerDetailStyle,
    rightIconViewStyle,
    ellipsisStyle,
    buttonStyle,
    pinStyle
  } = styles;

  const showActionSheet = async () => {
    this.ActionSheet.show();
    await postEditUpdate({ prop: 'postText', value: postText });
    await postEditUpdate({ prop: 'postId', value: postId });
  };

  const posted = displayTimeAgo(timestamp, createdOn);
  const options = (uid, authorId) => {
    if (uid === authorId) {
      return ['Edit', 'Cancel'];
    }
    return ['Cancel'];
  };
  const cancelButtonIndex = () => {
    return options(userId, id).length - 1;
  };

  const pinPress = async () => {
    pinPost({ postId, userId });
  };

  return (
    <View style={containerStyle}>
      <Image
        style={thumbnailStyle}
        source={{ uri: picture }}
      />
      <View style={headerContentStyle}>
        <Text style={headerAuthorStyle}>{name}</Text>
        <Text style={headerDetailStyle}>{posted}</Text>
      </View>

      { id === userId ?
        <View style={rightIconViewStyle}>
          <ActionButton
            iconStyle={ellipsisStyle}
            buttonStyle={buttonStyle}
            imageSource={require('../../assets/images/ellipsis.png')}
            onPress={showActionSheet}
          />
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={options(userId, id)}
            cancelButtonIndex={cancelButtonIndex()}
            destructiveButtonIndex={-1}
            onPress={(index) => {
              if (index === 0) {
                redirect('PostEdit');
              }
            }}
          />
        </View>
        :
        <View style={rightIconViewStyle}>
          <ActionButtonStill
            buttonStyle={buttonStyle}
            iconName={'pushpino'}
            iconStyle={pinStyle}
            iconSize={20}
            onPress={pinPress}
          />
        </View>
      }

    </View>

  );
};

const styles = {
  containerStyle: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10
  },
  headerAuthorStyle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  headerDetailStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'gray'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  rightIconViewStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  ellipsisStyle: {
    height: 15,
    width: 15,
  },
  buttonStyle: {
    alignItems: 'flex-start'
  },
  pinStyle: {
    transform: [
      { scaleX: -1 }
    ]
  },
};

export default PostListItemBanner;
