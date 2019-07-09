import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import { disabledGray, activeButtonBlue } from '../../assets/colors';

const InputGrowingHooked = ({
  placeholder, onChange, onSave, user, postAuthorId, postId, index
}) => {
  const [newValue, setNewValue] = useState('');
  const [height, setHeight] = useState(23);

  const onChangeText = (text) => {
    if (onChange) {
      onChange(newValue, user.uid, postAuthorId);
    }

    setNewValue(text);
  };

  const updateSize = (h) => {
    setHeight(h);
  };

  const save = () => {
    try {
      onSave({ user, comment: newValue, postAuthorId, postId, index });
      setNewValue('');
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  };

  const {
    containerViewStyle,
    textInputViewStyle,
    inputStyle,
    buttonStyle,
    buttonTextStyle
   } = styles;
  const newStyle = { height };
  const emptyText = (!newValue || newValue.length === 0);
  const buttonColor = emptyText ? disabledGray : activeButtonBlue;

  return (
    <View style={containerViewStyle}>
      <View style={textInputViewStyle}>
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => onChangeText(text)}
          style={[inputStyle, newStyle]}
          editable
          multiline
          value={newValue}
          onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        />
    </View>
      <TouchableOpacity
        style={{ ...buttonStyle, borderColor: buttonColor }}
        onPress={save}
        disabled={emptyText}
      >
        <Text style={{ ...buttonTextStyle, color: buttonColor }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  },
  textInputViewStyle: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
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
    height: 45,
    width: 45,
    borderRadius: 25,
    marginLeft: 11,
    marginRight: 9,
    marginBottom: 10
  },
  buttonStyle: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginBottom: 10,
    marginLeft: 8,
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

export { InputGrowingHooked };
