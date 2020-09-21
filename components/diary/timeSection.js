import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../commonFunctions/common';
//style
import {Colors} from '../../styles/colors';
//third party lib
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const TimeSection = (props) => {
  const {name} = props;

  return name === morningObj.name ? (
    <>
      <View style={styles.headerStyle}>
        <Ionicon name="sunny" size={30} style={styles.periodIcon} />
        <Text style={styles.periodText}>Morning</Text>
        <Text style={styles.periodTiming}>(5:00 AM - 11:59 AM)</Text>
      </View>
      <View style={styles.border} />
    </>
  ) : name === afternoonObj.name ? (
    <>
      <View style={styles.headerStyle}>
        <Icon name="weather-sunset" size={30} style={styles.periodIcon} />
        <Text style={styles.periodText}>Afternoon</Text>
        <Text style={styles.periodTiming}>(12:00 PM - 4:59 PM)</Text>
      </View>
      <View style={styles.border} />
    </>
  ) : name === eveningObj.name ? (
    <>
      <View style={styles.headerStyle}>
        <Icon name="weather-sunset-down" size={30} style={styles.periodIcon} />
        <Text style={styles.periodText}>Evening</Text>
        <Text style={styles.periodTiming}>(5:00 PM - 4:59 AM)</Text>
      </View>
      <View style={styles.border} />
    </>
  ) : (
    <>
      <View style={styles.headerStyle}>
        <Ionicon name="moon" size={30} style={styles.periodIcon} />
        <Text style={styles.periodText}>Night</Text>
        <Text style={styles.periodTiming}>(10:00 PM - 3:59 PM)</Text>
      </View>
      <View style={styles.border} />
    </>
  );
};

export default TimeSection;

const styles = StyleSheet.create({
  headerStyle: {
    marginStart: '3%',
    flexDirection: 'row',
    marginTop: '1%',
  },
  periodIcon: {
    marginEnd: '3%',
  },
  periodText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 19,
    color: Colors.lastLogValueColor,
    marginTop: '2%',
  },
  periodTiming: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 15,
    color: Colors.lastLogValueColor,
    marginStart: '3%',
    marginTop: '3%',
  },
  border: {
    borderWidth: 0.4,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
});

//comment
