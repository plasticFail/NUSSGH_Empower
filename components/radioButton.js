import React from 'react';
import {View, Text} from 'react-native';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';


function RadioButton(props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={[
          {
            height: adjustSize(24),
            width: adjustSize(24),
            borderRadius: adjustSize(12),
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
              height: adjustSize(12),
              width: adjustSize(12),
              borderRadius: adjustSize(6),
              backgroundColor: props.color,
            }}
          />
        ) : null}
      </View>
      <Text
        style={{
          marginStart: '3%',
          marginTop: '1.5%',
          fontSize: adjustSize(17),
          color: props.color,
          fontWeight: '700',
        }}>
        {props.btnText}
      </Text>
    </View>
  );
}

export default RadioButton;
