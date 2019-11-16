import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { ActionButton, ActionButtonStill, ButtonAsText } from '../common';
import { displayTimeAgoShort } from '../../functions/common';
import { pinPost, unpinPost } from '../../actions';
import { disabledGray, darkGray } from '../../assets/colors';

const Banner = ({
  userId,
  author,
  redirect,
  postId,
  visibleTo,
  pinned,
  timestamp,
  createdOn,
  onProfile,
  taggedFriends = {},
}) => {
  const { name, picture } = author;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorButtonStyle,
    headerAuthorTextStyle,
    headerDetailStyle,
    rightIconViewStyle,
    buttonStyle,
    pinStyle,
    pinnedStyle
  } = styles;

  const posted = displayTimeAgoShort(timestamp, createdOn);

  const pinPress = async () => {
    if (pinned) {
      unpinPost({ postId, userId });
    } else {
      pinPost({ postId, userId });
    }
  };

  const goToPublicProfile = () => {
    if (userId === author.id) {
      redirect('Profile'); return;
    }

    redirect('PublicProfileScreen', {
      profileUser: { ...author, uid: author.id },
      status: 'Unfriend',
    });
  };

  const pinButtonStyle = pinned ? pinnedStyle : pinStyle;
  const disabled = !!onProfile;

  const Visibility = () => {
    if (visibleTo !== 'Tagged Friends') {
      return (
        <Text style={headerDetailStyle}>{posted} · {visibleTo || 'All Friends'}</Text>
      );
    }

    const onPress = () => redirect('TaggedFriendsScreen', { taggedFriends });

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={headerDetailStyle}>{posted} · Tagged Friends</Text>
      </TouchableOpacity>
    );
  };

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
          editButtonStyle={headerAuthorButtonStyle}
          editTextStyle={headerAuthorTextStyle}
          onPress={goToPublicProfile}
          disabled={disabled}
        >
          {name}
        </ButtonAsText>
        <Visibility />
      </View>

      <View style={rightIconViewStyle}>
        <ActionButtonStill
          buttonStyle={buttonStyle}
          iconName={'pushpino'}
          iconStyle={pinButtonStyle}
          iconSize={19}
          onPress={pinPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  headerAuthorButtonStyle: {
    alignSelf: 'flex-start'
  },
  headerAuthorTextStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  headerDetailStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: darkGray
  },
  thumbnailStyle: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  rightIconViewStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  buttonStyle: {
    marginTop: -12,
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
});

export default Banner;
