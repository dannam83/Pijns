import React, { Component } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import { disabledGray, activeButtonBlue } from '../../assets/colors';

class InputGrowing extends Component {
  state = {
    newValue: '',
    height: 40,
  }

  onChangeText = (newValue) => {
    this.setState({ newValue });
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  updateSize = (height) => {
    this.setState({ height });
  }

  save = () => {
    const { onSave, user, postAuthorId, postId, index } = this.props;
    const { newValue } = this.state;

    try {
      onSave({ user, comment: newValue, postAuthorId, postId, index });
      this.setState({ newValue: '' });
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const { newValue, height } = this.state;
    const {
      containerViewStyle,
      textInputViewStyle,
      inputStyle,
      thumbnailStyle,
      buttonStyle,
      buttonTextStyle
     } = styles;
    const { picture } = this.props.user;
    const newStyle = { height };
    const emptyText = this.state.newValue.length === 0;
    const buttonColor = emptyText ? disabledGray : activeButtonBlue;

    return (
      <View style={containerViewStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: picture }}
        />
        <View style={textInputViewStyle}>
          <TextInput
            placeholder={this.props.placeholder}
            onChangeText={(value) => this.onChangeText(value)}
            style={[inputStyle, newStyle]}
            editable
            multiline
            value={newValue}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          />
      </View>
        <TouchableOpacity
          style={{ ...buttonStyle, borderColor: buttonColor }}
          onPress={this.save}
          disabled={emptyText}
        >
          <Text style={{ ...buttonTextStyle, color: buttonColor }}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  textInputViewStyle: {
    flex: 1,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#D3D3D3',
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    lineHeight: 23,
  },
  thumbnailStyle: {
    height: 47,
    width: 47,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 8,
    marginBottom: 19
  },
  buttonStyle: {
    height: 47,
    width: 47,
    borderRadius: 25,
    marginBottom: 19,
    marginLeft: 8,
    marginRight: 10,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: '600'
  }
};

export { InputGrowing };
