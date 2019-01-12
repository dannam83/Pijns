import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, CardBanner } from './common';

class ListItem extends Component {
  onRowPress() {
    Actions.postEdit({ post: this.props.post });
  }

  render() {
    const { postText } = this.props.post;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardBanner />
          <CardSection>
            <Text>
              {postText}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
