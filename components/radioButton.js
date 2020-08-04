import React from 'react';
import {View, Text} from 'react-native';

function RadioButton(props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: props.color,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1%',
          },
          props.style,
        ]}>
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: props.color,
            }}
          />
        ) : null}
      </View>
      <Text
        style={{
          marginStart: '3%',
          marginTop: '1.5%',
          fontSize: 17,
          color: props.color,
          fontWeight: '700',
        }}>
        {props.btnText}
      </Text>
    </View>
  );
}

export default RadioButton;
