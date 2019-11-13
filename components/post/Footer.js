import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { ActionButton } from '../common';
import { getCurrentDate } from '../../functions/common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn, updateUserFeed } from '../../actions';
import {
  sendPijnNotification,
  sendPrayerAnsweredNotifications
} from '../../api/notifications_api';
import { likePost, unlikePost } from '../../api/posts_api';

class Footer extends Component {
  // state = {
  //   noteCount: this.props.notes || 0,
  //   pijnSent: this.props.post.pijnSentToday,
  //   likeCount: this.props.likes || 0,
  //   postLiked: this.props.post.liked,
  //   answered: this.props.post.answered,
  // }

  shouldComponentUpdate(nextProps) {
    const { notes, likes, post: { pijnSentToday, liked, answered } } = nextProps;
    const {
      notes: prevNotes,
      likes: prevLikes,
      post: { pijnSentToday: prevPijnSentToday, liked: prevLiked, answered: prevAnswered },
    } = this.props;
    return (
      notes !== prevNotes || likes !== prevLikes || liked !== prevLiked ||
      pijnSentToday !== prevPijnSentToday || answered !== prevAnswered
    );
  }

  render() {
  const {
    post, notes = 0, pinnedOnly, redirect, navigationTab,
    keepComments, likes = 0, userFeedIndex
  } = this.props;
  const {
    user, postId, author, navigation, index, pinned,
    pijnSentToday, commentCount = 0, answered, liked
  } = post;
  console.log(Date.now(), postId, likes)
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  const { actionsViewStyle, dividerStyle, worshipHandsActive, worshipHandsInactive
  } = styles;

  // const [noteCount, setNoteCount] = useState(notes || 0);
  // useEffect(() => { setNoteCount(notes || 0); }, [notes]);
  //
  // const [pijnSent, setPijnSent] = useState(pijnSentToday);
  // useEffect(() => { setPijnSent(pijnSentToday); }, [pijnSentToday]);
  //
  // const [likeCount, setLikeCount] = useState(likes || 0);
  // useEffect(() => { setLikeCount(likes); }, [likes]);
  //
  // const [postLiked, setPostLiked] = useState(post.liked);
  // useEffect(() => { setPostLiked(post.liked); }, [post.liked]);
  //
  // const [handsActive, setHandsActive] = useState(false);
  // useEffect(() => { setHandsActive(worshipHandsActive); }, [worshipHandsActive]);
  //
  // const [answered, setAnswered] = useState(post.answered);
  // useEffect(() => { setAnswered(post.answered); }, [post.answered]);
  //
  // const dispatch = useDispatch();

  const updateFeed = (field, value) => {
    console.log('update', userFeedIndex, field, value)
    if (userFeedIndex || userFeedIndex === 0) {
      updateUserFeed(userFeedIndex, field, value);
    }
  };

  const goToComments = async () => {
    navigation.navigate('CommentsScreen', {
      user, postAuthorId: author.id, postId, redirect, author, index, navigationTab, keepComments
    });
  };

  const goToChat = async () => {
    navigation.navigate('ChatScreen', {
      user, postAuthorId: author.id, postId, redirect, index, friend: author
    });
  };

  const goToPostNotes = async () => {
    navigation.navigate('PostNotesListScreen', {
      user, postAuthorId: author.id, postId, index, navigationTab
    });
  };

  const pijnPress = () => {
    // const { noteCount, pijnSent } = this.state;
    // if (navigationTab === 'UserFeed') { this.setState({ noteCount: noteCount + 1 }); }
    if (userFeedIndex || userFeedIndex === 0) {
      updateFeed('notes', notes + 1);
    }

    // this.setState({
    //   noteCount: noteCount + 1,
    //   pijnSent: !pijnSent,
    // });
    // setNoteCount(noteCount + 1);
    sendPijn({ postId, author, currentDate, user });
    sendPijnNotification(user, postId, post);
  };

  const PijnButton = () => {
    return (
      <ActionButton
        imageSource={require('../../assets/images/pijn.png')}
        iconStyle={{ height: 20, width: 22 }}
        onPress={() => pijnPress()}
        disabled={pijnSentToday}
      />
    );
  };

  const StarButton = () => {
    return (
      <TouchableOpacity style={{ paddingTop: 3 }}>
        <AntDesign
          name={'staro'}
          size={19}
          color={'#434343'}
        />
      </TouchableOpacity>
    );
  };

  const CommentButton = () => {
    return (
      <TouchableOpacity style={{ paddingTop: 4 }} onPress={goToComments}>
        <AntDesign
          name={'message1'}
          size={17}
          color={'#454545'}
        />
      </TouchableOpacity>
    );
  };

  const handsPress = () => {
    // const { answered } = this.state;
    const { answerPrayer, unanswerPrayer } = this.props;
    // setHandsActive(!handsActive);
    if (answered) {
      this.setState({ answered: false }); unanswerPrayer({ postId, user });
    } else {
      this.setState({ answerd: getCurrentDate() }); answerPrayer({ postId, user });
      sendPrayerAnsweredNotifications(user, postId, post);
    }
  };

  const ChatOrHandsButton = () => {
    if (author.id !== user.uid) {
      const chat = require('../../assets/images/directMessage.png');

      return <ActionButton imageSource={chat} onPress={goToChat} />;
    }

    const whStyle = answered ? worshipHandsActive : worshipHandsInactive;
    const hands = require('../../assets/images/praise.png');

    return <ActionButton imageSource={hands} onPress={handsPress} iconStyle={whStyle} />;
  };

  if (pinnedOnly && !pinned) {
    return null;
  }

  const likePress = () => {
    // const { postLiked, likeCount } = this.state;
    let newCount;
    if (liked) {
      newCount = likes - 1;
      unlikePost({ user, postId, authorId: post.author.id });
    } else {
      newCount = likes + 1;
      likePost({ user, postId, authorId: post.author.id });
    }
    // this.setState({ postLiked: !liked, likeCount: newCount });
    console.log('func', liked, newCount)
    updateFeed('likes', newCount);
  };

  const LikeButton = () => {
    return (
      !liked ? (
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={likePress}>
          <AntDesign
            name={'hearto'}
            size={18}
            color={'#454545'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={likePress}>
          <AntDesign
            name={'heart'}
            size={18}
            color={'red'}
          />
        </TouchableOpacity>
      )
    );
  };

  return (
    <View>
      <PostCounts
        noteCount={notes}
        commentCount={commentCount}
        likeCount={likes}
        commentsPress={goToComments}
        notesPress={goToPostNotes}
      />

      {answered ? (
        <View>
          <Divider style={dividerStyle} />
          <PostPrayerAnswered date={answered} />
          <Divider style={[dividerStyle, { marginTop: 10 }]} />
        </View>
      ) : (
        <Divider style={dividerStyle} />
      )}

      <View style={actionsViewStyle}>
        <PijnButton />
        <StarButton />
        <ChatOrHandsButton />
        <CommentButton />
        <LikeButton />
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: '#D3D3D3',
    marginTop: 3,
    marginBottom: 10
  },
  actionsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35
  },
  worshipHandsInactive: {
    height: 21,
    width: 24,
    marginLeft: -1.5,
  },
  worshipHandsActive: {
    height: 21,
    width: 24,
    marginLeft: -1.5,
    tintColor: '#50C35C'
  },
});

// export default Footer;
export default connect(null, {
  answerPrayer, unanswerPrayer, sendPijn, updateUserFeed
})(Footer);
