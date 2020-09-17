import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
// Components
import FoodRow from './FoodRow';
import logStyles from '../../../styles/logStyles';

function ReadOnlyMealDisplay(props) {
  const {style, show, data} = props;
  return (
    show && (
      <View style={logStyles.lastLogDetailContainer}>
        <Text style={logStyles.lastLogDate}>{data.recordDate}</Text>
        <View style={logStyles.lastLogBorder} />
        <View style={{marginStart: Dimensions.get('window').width * 0.04}}>
          {data.foodItems.map((food) => (
            <FoodRow key={food['food-name']} food={food} />
          ))}
        </View>
        <View style={logStyles.lastLogBorder} />
      </View>
    )
  );
}

/*
const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4DAA50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8d8d8d',
    padding: 10,
    width: '80%',
  },
  recordDateContainer: {
    borderBottomWidth: 1,
    borderColor: '#E2E7EE',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
*/
export default ReadOnlyMealDisplay;
//edit flag
