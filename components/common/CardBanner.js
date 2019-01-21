import React from 'react';
import { Text, View, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { ListActionButton } from './ListActionButton';

const CardBanner = ({ author }) => {
  const { id, name, picture } = author;
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

  const showActionSheet = () => {
    this.ActionSheet.show();
  };

  return (
    <View style={containerStyle}>
      <Image
        style={thumbnailStyle}
        source={{ uri: picture }}
      />
      <View style={headerContentStyle}>
        <Text style={headerAuthorStyle}>{name}</Text>
        <Text style={headerDetailStyle}>{id}</Text>
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
          options={['Edit', 'cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={-1}
          onPress={(index) => { console.log(index); }}
        />
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  headerDetailStyle: {
    fontSize: 12,
    fontWeight: '100'
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
