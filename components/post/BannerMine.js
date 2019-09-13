import React from 'react';
import { Text, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { ActionButton, ActionButtonStill, ButtonAsText } from '../common';
import { displayTimeAgo } from '../../functions/common';
import { pinPost, unpinPost } from '../../actions';
import { disabledGray } from '../../assets/colors';

const BannerMine = ({
  userId,
  author,
  redirect,
  postEditUpdate,
  postText,
  postId,
  visibleTo,
  pinned,
  timestamp,
  createdOn,
  showDeleteModal,
  onProfile
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
    pinStyle,
    pinnedStyle
  } = styles;

  const showActionSheet = async () => {
    if (userId !== author.id) return;
    this.ActionSheet.show();
    await postEditUpdate({ prop: 'postText', value: postText });
    await postEditUpdate({ prop: 'postId', value: postId });
    await postEditUpdate({ prop: 'visibleTo', value: visibleTo });
  };

  const options = ['Delete', 'Edit', 'Cancel'];
  const cancelButtonIndex = options.length - 1;
  const onPressActionSheet = (index) => {
    switch (index) {
      case 0: showDeleteModal(); break;
      case 1: redirect('Profile_PostEdit'); break;
      case 2: break;
      default: console.warn('Invalid input'); break;
    }
  };

  const posted = displayTimeAgo(timestamp, createdOn);

  const pinPress = async () => {
    if (pinned) {
      unpinPost({ postId, userId });
    } else {
      pinPost({ postId, userId });
    }
  };

  const goToPublicProfile = () => {
    redirect('UserFeed_PublicProfile', {
      profileUser: { ...author, uid: author.id },
      status: 'Unfriend',
      navigationTab: 'UserFeed'
    });
  };

  const pinButtonStyle = pinned ? pinnedStyle : pinStyle;
  const disabled = !!onProfile;

  return (
    <View style={containerStyle}>
      <ActionButton
        iconStyle={thumbnailStyle}
        imageSource={{ uri: picture }}
        onPress={goToPublicProfile}
        disabled={disabled}
      />
      <View style={headerContentStyle}>
        <ButtonAsText
          editTextStyle={headerAuthorStyle}
          onPress={goToPublicProfile}
          disabled={disabled}
        >
          {name}
        </ButtonAsText>
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
            options={options}
            cancelButtonIndex={cancelButtonIndex}
            destructiveButtonIndex={0}
            onPress={(index) => { onPressActionSheet(index); }}
          />
        </View>
        :
        <View style={rightIconViewStyle}>
          <ActionButtonStill
            buttonStyle={buttonStyle}
            iconName={'pushpino'}
            iconStyle={pinButtonStyle}
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
    height: 40,
    width: 40,
    borderRadius: 20
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
  pinnedStyle: {
    color: disabledGray,
    transform: [
      { scaleX: -1 }
    ]
  },
};

export default BannerMine;
