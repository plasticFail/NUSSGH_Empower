import React from 'react';
import {View, Text} from 'react-native';
import Counter from '../onboarding/medication/Counter';
import {Colors} from '../../styles/colors';
import logStyles from '../../styles/logStyles';

const RenderCounter = (props) => {
  const {fieldName, item, parameter} = props;
  const {setItem} = props;
  return (
    <>
      <Text
        style={[
          logStyles.fieldName,
          {color: Colors.lastLogValueColor, marginStart: '4%'},
        ]}>
        {fieldName}
      </Text>
      <View style={{marginTop: '-9%'}}>
        <Counter
          count={item}
          setCount={setItem}
          parameter={parameter}
          fieldName={''}
          inputable={true}
        />
      </View>
    </>
  );
};
export default RenderCounter;
