import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { postCreateUpdate, postEditUpdate } from '../../actions';

const PostFormHeader = ({ user }) => {
  const { name, picture } = user;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorStyle,
    visibleToStyle,
    rightIconViewStyle,
    buttonStyle
  } = styles;
  //
  // const posted = displayTimeAgo(timestamp, createdOn);
  //
  // const pinPress = async () => {
  //   if (pinned) {
  //     unpinPost({ postId, userId });
  //   } else {
  //     pinPost({ postId, userId });
  //   }
  // };
  //
  // const goToPublicProfile = () => {
  //   if (userId === author.id) {
  //     redirect('Profile'); return;
  //   }
  //
  //   redirect(`${navigationTab}_PublicProfile`, {
  //     profileUser: { ...author, uid: author.id },
  //     status: 'Unfriend',
  //     navigationTab: 'UserFeed'
  //   });
  // };

  // const pinButtonStyle = pinned ? pinnedStyle : pinStyle;
  // const disabled = !!onProfile;

  return (
    <View style={containerStyle}>
      <Image
        style={thumbnailStyle}
        source={{ uri: picture }}
      />
      <View style={headerContentStyle}>
        <Text
          style={headerAuthorStyle}
        >
          {name}
        </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={visibleToStyle}>Visible to </Text>
            <Text style={{ ...visibleToStyle, fontWeight: '700' }}>Only Me</Text>
          </View>
      </View>
    </View>
  );
};
    //
    //   <View style={rightIconViewStyle}>
    //     <ActionButtonStill
    //       buttonStyle={buttonStyle}
    //       iconName={'pushpino'}
    //       iconStyle={pinButtonStyle}
    //       iconSize={20}
    //       onPress={pinPress}
    //     />
    //   </View>


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
  visibleToStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'gray',
    fontStyle: 'italic'
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
  buttonStyle: {
    alignItems: 'flex-start'
  },
};

export default PostFormHeader;
