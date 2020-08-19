import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActionSheetIOS, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//component
import Select from '../components/select';
//third party library
import Entypo from 'react-native-vector-icons/Entypo';
//functions
import {getDateRange} from '../commonFunctions/diaryFunctions';

//*use options as title for arra
const dates = [
  {name: 'Past Week', value: '7'},
  {name: 'Past Month', value: '28'},
  {name: 'Past Year', value: '360'},
];

//returns a list of dates array based on today's date
//pass in a getDateFromFilter prop method to get the date array
const Filter = (props) => {
  const returnDateArray = (value) => {
    let arr = getDateRange(Number(value));
    props.getDateArrFromFilter(arr);
  };

  return (
    <View style={{alignSelf: 'flex-end'}}>
      <Select
        defaultValue="7"
        options={dates}
        onSelect={returnDateArray}
        containerStyle={styles.containerStyle}
        textStyle={{fontSize: 15}}
        rightIcon="chevron-down"
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'flex-end',
    fontSize: 16,
    width: '70%',
    height: 30,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  filterButtonStyle: {
    borderRadius: 10,
    borderWidth: 2,
    padding: '4%',
    flexDirection: 'row',
  },
  filterText: {
    marginStart: '1%',
    flex: 1,
  },
});
