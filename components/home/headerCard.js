import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
//function
import {useNavigation} from '@react-navigation/native';
//styles
import {Colors} from '../../styles/colors';
//component
import UncompleteLogCard from '../uncompleteLogCard';
import {green_color} from '../../commonFunctions/common';

const HeaderCard = (props) => {
  const {username, hour, uncompleteLogs} = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: Colors.lastLogButtonColor,
        paddingBottom: '3%',
      }}>
      <Text style={styles.greetingText}>Good {hour},</Text>
      <Text style={styles.usernameText}>{username}</Text>
      {uncompleteLogs.length > 0 ? (
        <>
          <Text style={styles.taskText}>
            <Text style={styles.bold}>{uncompleteLogs.length}</Text> mandatory
            task(s)
          </Text>
          <TouchableOpacity
            style={styles.logCard}
            onPress={() => navigation.navigate('AddLog')}>
            <Text style={[styles.greetingText, {color: Colors.menuColor}]}>
              Create a log for the {hour}
            </Text>
            <UncompleteLogCard
              uncompleteLogs={uncompleteLogs}
              color={green_color}
              hideChevron={false}
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.taskText}>
          You have completed your logs for the {hour}!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  greetingText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  taskText: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    marginStart: '5%',
    fontSize: 18,
  },
  bold: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    marginStart: '5%',
    fontSize: 18,
  },
  logCard: {
    backgroundColor: 'white',
    borderRadius: 9.5,
    marginTop: '3%',
    marginStart: '5%',
    marginEnd: '5%',
    padding: '3%',
  },
  logLogo: {
    marginEnd: '3%',
    marginStart: '5%',
    marginTop: '3%',
  },
  usernameText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  buttonStyle: {
    backgroundColor: '#aad326',
    padding: '2%',
    borderRadius: 20,
    margin: '4%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  chevron: {
    marginTop: '5%',
    color: Colors.lastLogValueColor,
  },
});

export default HeaderCard;

//comment
