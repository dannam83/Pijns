import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

class MessagesIcon extends Component {
  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('ChatStack');
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

const styles = StyleSheet.create({
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
});

function mapStateToProps(state) {
  const { messagesCount, navigation, user } = state;
  return ({ messages: messagesCount, navigation, userId: user.uid });
}

export default connect(mapStateToProps)(MessagesIcon);
