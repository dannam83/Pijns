import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { resetMessagesCount } from '../../api/chat_api';

class MessagesIcon extends Component {
  onPress = () => {
    const { navigation, userId } = this.props;
    resetMessagesCount(userId);
    navigation.navigate('Chat');
  }

  render() {
    const { name, size, focused, color, messages } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <AntDesign focused={focused} name={name} size={size} color={color} />
        </TouchableWithoutFeedback>

        {messages > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { messages < 100 ? messages : '!!' }
            </Text>
          </View>
          :
          null
        }
      </View>
    );
  }
}

const styles = {
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgeStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
};

function mapStateToProps(state) {
  const { messagesCount, navigation, user } = state;
  return ({ messages: messagesCount, navigation, userId: user.uid });
}

export default connect(mapStateToProps)(MessagesIcon);
