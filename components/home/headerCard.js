import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//styles
import {Colors} from '../../styles/colors';
import {scaleFont} from '../../commonFunctions/scaleFunction';

const HeaderCard = (props) => {
  const {username, hour} = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: '#F5F6F9',
        paddingBottom: '3%',
      }}>
      <Text style={styles.greetingText}>Good {hour},</Text>
      <Text style={styles.usernameText}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingText: {
    color: 'black',
    fontSize: scaleFont(15),
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  usernameText: {
    color: '#16A750',
    fontSize: scaleFont(30),
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  chevron: {
    marginTop: '5%',
    color: Colors.lastLogValueColor,
  },
});

export default HeaderCard;

//comment
