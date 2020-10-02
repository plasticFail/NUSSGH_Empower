import React from 'react';
import {View, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import StepCounter from '../stepCounter';

const RenderCounter = (props) => {
  const {fieldName, item, parameter} = props;
  const {setItem} = props;
  return (
    <View style={{marginBottom: '3%'}}>
      <Text style={[globalStyles.goalFieldName, {flex: 0}]}>
        {fieldName} ({parameter})
      </Text>
      <View style={{marginTop: '-9%'}}>
        <StepCounter
          count={item}
          setCount={setItem}
          parameter={parameter}
          fieldName={''}
          inputable={true}
          enableInput={true}
        />
      </View>
    </View>
  );
};
export default RenderCounter;
