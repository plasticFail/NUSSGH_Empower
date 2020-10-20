import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import CircularProgress from '../../dashboard/todayOverview/CircularProgress';
import {renderNutrientPercent} from '../../../commonFunctions/common';
import ProgressBar from '../../progressbar';

const NutritionCol = (props) => {
  const {amount, nutrientType, header} = props;
  const [percent, setPercent] = useState('');

  useEffect(() => {
    renderNutrientPercent(amount, nutrientType).then((value) => {
      if (value > 100) {
        let final = 100 + '%';
        setPercent(final);
      } else {
        let final = value + '%';
        setPercent(final);
      }
    });
  }, []);

  return (
    <View>
      <Text style={styles.foodHeader}>{header}</Text>
      <ProgressBar
        containerStyle={{height: 7.5, marginBottom: 5, width: 70}}
        progress={'22%'}
        progressBarColor={'#005c30'}
        backgroundBarColor={'white'}
      />
      <Text style={styles.foodDetail}>{amount} g</Text>
    </View>
  );
};

export default NutritionCol;

const styles = StyleSheet.create({
  foodHeader: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 17,
    marginBottom: '6%',
  },
  foodDetail: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 17,
    color: '#005c30',
  },
});
