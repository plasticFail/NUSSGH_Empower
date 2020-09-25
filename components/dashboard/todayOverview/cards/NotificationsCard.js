import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
//svg
import CALENDAR_LOGO from '../../../../resources/images/Patient-Icons/SVG/icon-green-calendar.svg';
//function
import {appointment, howTo} from '../../../../commonFunctions/common';
//style
import {Colors} from '../../../../styles/colors';

export default function NotificationsCard(props) {
  const {type, count} = props;
  return (
    <>
      {type === appointment && (
        <TouchableOpacity style={[styles.card, styles.shadow]}>
          <CALENDAR_LOGO width={30} height={30} marginStart={'2%'} />
          <Text
            style={{color: Colors.backArrowColor, flex: 1, marginLeft: '3%'}}>
            {count} <Text style={{color: '#000'}}>Upcoming Appointments</Text>
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            color={Colors.lastLogValueColor}
          />
        </TouchableOpacity>
      )}
      {type === howTo && (
        <TouchableOpacity style={[styles.card, styles.shadow]}>
          <EvilIcon
            name="question"
            color={Colors.lastLogButtonColor}
            size={40}
          />
          <Text style={{flex: 1, marginLeft: '3%'}}>How To Use Empower</Text>
          <Icon
            name="chevron-right"
            size={20}
            color={Colors.lastLogValueColor}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginStart: '5%',
    marginEnd: '5%',
    marginTop: '5%',
    padding: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
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
