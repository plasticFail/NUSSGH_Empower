import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
//svg
import CALENDAR_LOGO from '../../../../resources/images/Patient-Icons/SVG/icon-green-calendar.svg';
//function
import {appointment, howTo} from '../../../../commonFunctions/common';
//style
import {Colors} from '../../../../styles/colors';
import TutorialModal from '../../../home/tutorialModal';

export default function NotificationsCard(props) {
  const {type, count} = props;
  const [showTutorial, setShowTutorial] = useState(false);

  const navigation = useNavigation();
  return (
    <>
      {type === appointment && (
        <TouchableOpacity
          style={[styles.card, styles.shadow]}
          onPress={() => setShowTutorial(true)}>
          <CALENDAR_LOGO width={30} height={30} marginStart={'2%'} />
          <Text style={[{color: Colors.backArrowColor}, styles.text]}>
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
        <TouchableOpacity
          style={[styles.card, styles.shadow]}
          onPress={() => setShowTutorial(true)}>
          <EvilIcon
            name="question"
            color={Colors.lastLogButtonColor}
            size={40}
          />
          <Text style={styles.text}>How To Use Empower</Text>
          <Icon
            name="chevron-right"
            size={20}
            color={Colors.lastLogValueColor}
          />
        </TouchableOpacity>
      )}
      <TutorialModal
        visible={showTutorial}
        closeModal={() => setShowTutorial(false)}
      />
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
  text: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    flex: 1,
    marginLeft: '3%',
  },
});
