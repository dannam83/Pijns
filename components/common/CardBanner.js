import React from 'react';
import { Text, View, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { ListActionButton } from './ListActionButton';

const CardBanner = ({
  userId, author, redirect, postEditUpdate, postText, postId, timestamp, createdOn
}) => {
  const { id, name, picture } = author;
  const secondsAgoPosted = Math.floor((Date.now() + timestamp) / 1000);
  console.log(secondsAgoPosted);
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    headerAuthorStyle,
    headerDetailStyle,
    ellipsisViewStyle,
    ellipsisStyle,
    buttonStyle
  } = styles;

  const showActionSheet = async () => {
    this.ActionSheet.show();
    await postEditUpdate({ prop: 'postText', value: postText });
    await postEditUpdate({ prop: 'postId', value: postId });
  };

  const posted = formatTimeAgo(secondsAgoPosted, createdOn);
  const options = (uid, authorId) => {
    if (uid === authorId) {
      return ['Edit', 'Cancel'];
    }
    return ['Cancel'];
  };
  const cancelButtonIndex = () => {
    return options(userId, id).length - 1;
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
      <View style={ellipsisViewStyle}>
        <ListActionButton
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
    </View>

  );
};

const formatTimeAgo = (secondsAgoPosted, createdOn) => {
  if (secondsAgoPosted < 60) {
    return `${secondsAgoPosted} second${secondsAgoPosted === 1 ? '' : 's'} ago`;
  }
  const minutesAgoPosted = Math.floor(secondsAgoPosted / 60);
  if (minutesAgoPosted < 60) {
    return `${minutesAgoPosted} minute${minutesAgoPosted === 1 ? '' : 's'} ago`;
  }
  const hoursAgoPosted = Math.floor(minutesAgoPosted / 60);
  if (hoursAgoPosted < 24) {
    return `${hoursAgoPosted} hour${hoursAgoPosted === 1 ? '' : 's'} ago`;
  }
  const daysAgoPosted = Math.floor(hoursAgoPosted / 24);
  if (daysAgoPosted < 30) {
    return `${daysAgoPosted} day${daysAgoPosted === 1 ? '' : 's'} ago`;
  }
  return createdOn;
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  headerDetailStyle: {
    fontSize: 13,
    fontWeight: '100',
    color: 'gray'
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  ellipsisViewStyle: {
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
  }
};

export { CardBanner };
