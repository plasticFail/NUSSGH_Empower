import React from 'react';
import {View, StyleSheet, Text, Image, Button} from 'react-native';
//third party library
import Icon from '../..';

const Legend = (props) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={[styles.legendContainer, styles.shadow]}>
        <View style={styles.legendContent}>
          <Image
            source={require('../../resources/images/bloodglucose_logo.png')}
            style={styles.iconImg}
          />
          <Text style={{margin: '3%', fontSize: 16}}>Blood Glucose</Text>

          <Image
            source={require('../../resources/images/medication_logo.png')}
            style={[styles.iconImg, {marginStart: '4%', height: '60%'}]}
          />
          <Text style={{margin: '3%', fontSize: 16}}>Medication</Text>
        </View>
        <View style={styles.legendContent}>
          <Image
            source={require('../../resources/images/foodintake_logo.png')}
            style={styles.iconImg}
          />
          <Text style={{margin: '3%', fontSize: 16}}>Food Intake</Text>
          <Image
            source={require('../../resources/images/weight_logo.png')}
            style={[styles.iconImg, {marginStart: '10%', height: '70%'}]}
          />
          <Text style={{marginTop: '3%', marginStart: '3%', fontSize: 16}}>
            Weight
          </Text>
        </View>
        <View style={styles.legendContent}>
          <Image
            source={require('../../resources/images/activity_logo.png')}
            style={[
              styles.iconImg,
              {width: 80, marginStart: '-8%', marginEnd: '-6%'},
            ]}
          />
          <Text style={{margin: '3%', fontSize: 16}}>Activity</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flex: 3,
    backgroundColor: '#c3f9cd',
    borderRadius: 20,
    padding: '3%',
  },
  legendContent: {
    flex: 1,
    flexDirection: 'row',
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
  iconImg: {
    width: 34,
    height: 34,
    resizeMode: 'contain', //resize image so dont cut off
  },
  filterButton: {},
});

export default Legend;
