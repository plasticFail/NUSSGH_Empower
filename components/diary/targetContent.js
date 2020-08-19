import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

//takes in an object with bgPass, bgMiss, weightPass, weightMiss... and displays the content
const TargetContent = (props) => {
  const {type} = props;
  const {bgPass, weightPass, activityPass} = props;
  const {bgPassCount, weightPassCount, activityPassCount} = props;

  return (
    <>{renderItem(type, bgPass, bgPassCount, weightPass, weightPassCount)}</>
  );
};
export default TargetContent;

function renderItem(type, bgResult, bgCount, weightResult, weightCount) {
  if (type === 'Within Target') {
    return (
      <>
        {bgResult == true && <Text>x {bgCount}</Text>}
        {weightResult == true && <Text>x {weightCount}</Text>}
      </>
    );
  }
}
