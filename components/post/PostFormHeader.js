import React from 'react';
import { Image, View, Text } from 'react-native';
import { ButtonAsText } from '../common';
import { buttonBlue } from '../../assets/colors';

const PostFormHeader = ({ user }) => {
  const { name, picture } = user;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorStyle,
    visibleLabelStyle,
    visibleButtonStyle,
  } = styles;

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
            <Text style={visibleLabelStyle}>Visible to: </Text>
            <ButtonAsText editTextStyle={visibleButtonStyle} >Only Me</ButtonAsText>
          </View>
      </View>
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
    fontSize: 15,
    fontWeight: 'bold'
  },
  visibleLabelStyle: {
    fontSize: 13,
    fontWeight: '100',
    color: 'gray',
    fontStyle: 'italic'
  },
  visibleButtonStyle: {
    fontSize: 13,
    fontWeight: '700',
    color: buttonBlue,
    fontStyle: 'italic'
  },
  thumbnailStyle: {
    height: 35,
    width: 35,
    borderRadius: 17
  }
};

export default PostFormHeader;
