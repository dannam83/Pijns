import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection, CardBanner } from '../common';

class PostListPostHeader extends Component {
  onRowPress() {
    // Actions.postEdit({ post: this.props.post });
  }

  render() {
    const { content } = this.props.post;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardBanner />
          <CardSection>
            <Text>
              {content}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PostListPostHeader;
