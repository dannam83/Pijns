import React from 'react';
import { Image, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonAsText } from '../common';
import { buttonBlue } from '../../assets/colors';
import PostFormVisibleToModal from './PostFormVisibleToModal';
import { SHOW_VISIBLE_TO_MODAL } from '../../actions/types';

const PostFormHeader = ({ user, visibleTo, route, postId }) => {
  const { name, picture } = user;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorStyle,
    visibleLabelStyle,
    visibleButtonStyle,
  } = styles;

  const visibleToModal = useSelector(state => state.modals).visibleTo;
  const dispatch = useDispatch();

  const editVisibleTo = () => {
    dispatch({ type: SHOW_VISIBLE_TO_MODAL });
  };

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
      <PostFormVisibleToModal
        postId={postId}
        currentVisibleTo={visibleTo}
        visible={visibleToModal}
        route={route}
      />
      <Image style={thumbnailStyle} source={{ uri: picture }} />
      <View style={headerContentStyle}>
        <Text style={headerAuthorStyle}>{name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={visibleLabelStyle}>Visible to: </Text>
            <ButtonAsText
              editTextStyle={visibleButtonStyle}
              onPress={editVisibleTo}
            >
              {visibleTo}
            </ButtonAsText>
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
