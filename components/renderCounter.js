import React from 'react';
import {View, Text} from 'react-native';
import globalStyles from '../styles/globalStyles';
import StepCounter from './stepCounter';

const RenderCounter = (props) => {
  const {
    fieldName,
    item,
    parameter,
    maxLength,
    allowInput,
    showUnitInParam,
    incrementValue,
    valueType,
  } = props;
  const {setItem} = props;
  return (
    <View style={{marginBottom: '3%', flexDirection: 'row', ...props.style}}>
      <View style={{flex: 1}}>
        {parameter === '' ? (
          <Text style={[globalStyles.goalFieldName, {flex: 0}]}>
            {fieldName}
          </Text>
        ) : showUnitInParam === false ? (
          <Text style={[globalStyles.goalFieldName, {flex: 0}]}>
            {fieldName}
          </Text>
        ) : (
          <Text style={[globalStyles.goalFieldName, {flex: 0}]}>
            {fieldName} [{parameter}]
          </Text>
        )}
      </View>
      <StepCounter
        count={item}
        setCount={setItem}
        parameter={parameter}
        fieldName={''}
        enableInput={allowInput === undefined ? true : allowInput}
        maxLength={maxLength}
        valueType={valueType}
        incrementValue={incrementValue === undefined ? 1 : incrementValue}
      />
    </View>
  );
};
export default RenderCounter;
