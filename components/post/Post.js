import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

import Banner from './Banner';
import Footer from './Footer';

class Post extends PureComponent {
  render() {
    const { post, userFeedIndex, navigation } = this.props;
    const {
      user, author, content, timestamp, createdOn, postId, pinned, taggedFriends,
    } = post;
    const userId = user.uid;
    const { containerStyle, contentStyle } = styles;

    return (
      <Card containerStyle={containerStyle}>
        <Banner
          author={author}
          redirect={navigation.navigate}
          postText={content}
          postId={postId}
          timestamp={timestamp}
          createdOn={createdOn}
          userId={userId}
          pinned={pinned}
          taggedFriends={taggedFriends}
        />

        <Text style={contentStyle}>{content}</Text>

        <Footer
          post={post}
          redirect={navigation.navigate}
          notes={post.notes.count}
          likes={post.likes}
          userFeedIndex={userFeedIndex}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 2
  },
  contentStyle: {
    fontSize: 16
  }
});

function mapStateToProps(state) {
  const {
    user, pijnLog, pinboard, navigation, postLikes,
    activePost: { post },
    modals: { postUnavailable },
    userFeedTab: { userFeedMap },
  } = state;

  if (!post) { return { postUnavailable }; }

  const userFeedIndex = userFeedMap[post.postId];
  const pijnSentToday = !!pijnLog[post.postId];
  const pinned = !!pinboard[post.postId];
  const liked = !!postLikes[post.postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation, liked };

  return { post: formattedPost, userFeedIndex, navigation };
}

export default connect(mapStateToProps)(Post);
