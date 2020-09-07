import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
//styles
import logStyles from '../../styles/logStyles';
import {Colors} from '../../styles/colors';

//show last values
const BloodGlucoseLogDisplay = (props) => {
  const {data, show} = props;
  const dropDownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(dropDownAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropDownAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    show && (
      <Animated.View style={{maxHeight: heightInterpolation}}>
        <Text style={logStyles.lastLogDate}>{data.dateString}</Text>
        <View style={logStyles.lastLogBorder} />
        <Text style={logStyles.fieldText}>Last Reading Recorded</Text>
        <Text style={[logStyles.fieldText, {color: Colors.lastLogValueColor}]}>
          {data.value} mmol/L
        </Text>
        <View style={logStyles.lastLogBorder} />
      </Animated.View>
    )
  );
};

export default BloodGlucoseLogDisplay;
