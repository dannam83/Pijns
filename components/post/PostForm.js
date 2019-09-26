import React, { useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import PostFormHeader from './PostFormHeader';

const PostForm = ({
  user, postId, postText, visibleTo, taggedFriends, tagCount, postUpdate, navigation, routeName
}) => {
  const textInput = useRef(null);

  useEffect(() => { textInput.current.focus(); }, []);

  const { navigate } = navigation;
  return (
    <View style={{ backgroundColor: 'white', padding: 10, flex: 1 }}>
      <PostFormHeader
        user={user}
        visibleTo={visibleTo}
        postId={postId}
        route={routeName}
        redirect={navigate}
        taggedFriends={taggedFriends}
        tagCount={tagCount}
        update={postUpdate}
      />
      <TextInput
        ref={textInput}
        placeholder="What would you like to share?"
        multiline
        autofocus
        value={postText}
        onChangeText={value => postUpdate({ prop: 'postText', value })}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PostForm;
