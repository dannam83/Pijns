import React, { useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { postCreateUpdate, postEditUpdate } from '../../actions';
import PostFormHeader from './PostFormHeader';

const PostForm = ({
  user, postId, postText, visibleTo, taggedFriends, postUpdate, navigation, routeName
}) => {
  const textInput = useRef(null);
  useEffect(() => { textInput.current.focus(); }, []);
  // componentDidMount() {
  //   textInput.focus();
  // }

  // const getTextValue = () => {
  //   if (props.routeName === 'postEdit') {
  //     return props.postEditText;
  //   }
  //   return props.postCreateText;
  // };
  //
  // const getVisibleTo = () => {
  //   if (props.routeName === 'postEdit') {
  //     return props.postEditVisibleTo || 'All Friends';
  //   }
  //   return props.postCreateVisibleTo || 'All Friends';
  // }
  //
  // const getTaggedFriends = () => {
  //   if (props.routeName === 'postEdit') {
  //     return props.postEditTaggedFriends || {};
  //   }
  //   return props.postCreateTaggedFriends || {};
  // }
  //
  // const update = () => {
  //   if (props.routeName === 'postEdit') {
  //     return props.postEditUpdate;
  //   }
  //   return props.postCreateUpdate;
  // }

  // render() {
  // const textValue = getTextValue();
  // const taggedFriends = getTaggedFriends();
  // const update = update();
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
// ref={(input) => { textInput = input; }}


// const mapStateToProps = state => {
//   const { user, postEdit, postCreate } = state;
//
//   return {
//     user,
//     postEditText: postEdit.postText,
//     postEditVisibleTo: postEdit.visibleTo,
//     postEditTaggedFriends: postEdit.taggedFriends,
//     postCreateText: postCreate.postText,
//     postCreateVisibleTo: postCreate.visibleTo,
//     postCreateTaggedFriends: postCreate.taggedFriends
//   };
// };

// export default connect(null, {
//   postCreateUpdate, postEditUpdate
// })(PostForm);

export default PostForm;
