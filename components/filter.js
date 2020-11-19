import React from 'react';
import {View, StyleSheet} from 'react-native';
//component
import Select from '../components/select';
//functions
import {getDateRange} from '../commonFunctions/diaryFunctions';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

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
        textStyle={{fontSize: adjustSize(15)}}
        rightIcon="chevron-down"
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'flex-end',
    fontSize: adjustSize(16),
    width: '70%',
    height: adjustSize(30),
    borderWidth: 1,
    backgroundColor: 'white',
  },
  filterButtonStyle: {
    borderRadius: adjustSize(10),
    borderWidth: 2,
    padding: '4%',
    flexDirection: 'row',
  },
  filterText: {
    marginStart: '1%',
    flex: 1,
  },
});
