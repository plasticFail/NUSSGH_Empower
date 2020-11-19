import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//styles
import {Colors} from '../../styles/colors';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


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
    fontSize: adjustSize(18),
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  taskText: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    marginStart: '5%',
    fontSize: adjustSize(18),
  },
  bold: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    marginStart: '5%',
    fontSize: adjustSize(18),
  },
  logCard: {
    backgroundColor: 'white',
    borderRadius: adjustSize(9.5),
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
    color: '#16A750',
    fontSize: adjustSize(40),
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  buttonStyle: {
    backgroundColor: '#aad326',
    padding: '2%',
    borderRadius: adjustSize(20),
    margin: '4%',
  },
  buttonText: {
    fontSize: adjustSize(18),
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
