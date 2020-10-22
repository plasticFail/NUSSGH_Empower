import React, {useEffect, useState} from 'react';
import {Animated, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
//component
import ProgressBar from '../../progressbar';
//style
import {Colors} from '../../../styles/colors';
//third party lib
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  getAge,
  getMax4Type,
  fats,
  protein,
} from '../../../commonFunctions/common';
import {getPatientProfile} from '../../../netcalls/requestsAccount';

const ProgressContent = (props) => {
  const {
    header,
    value,
    type,
    flip,
    details,
    targetUnit,
    clickable,
    small,
  } = props;
  const {chevronDownMethod} = props;
  const [percentage, setPercentage] = useState('');
  const [target, setTarget] = useState(0);
  const [patient, setPatient] = useState({});
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');

  useEffect(() => {
    async function getProfile() {
      let response = await getPatientProfile();

      setPatient(response?.patient);
      setGender(response?.patient?.gender);
      setAge(getAge(response?.patient?.birth_date));
    }
    getProfile();
    let max = getMax4Type(age, type, gender);
    setTarget(max);
    let percent = Math.floor((Number(value) / Number(max)) * 100) + '%';
    setPercentage(percent);
  }, [value]);

  return !flip ? (
    <View style={{flex: 1, marginEnd: '1.5%', alignSelf: 'flex-start'}}>
      <Text style={styles.header}>{header}</Text>
      <ProgressBar
        progress={percentage}
        useIndicatorLevel={true}
        reverse={false}
        containerStyle={styles.progressContainer}
      />
      <Text style={styles.valueStyle}>
        {value}{' '}
        <Text style={styles.outOf}>
          {' '}
          / {target} {targetUnit}
        </Text>
      </Text>
    </View>
  ) : (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <View style={{marginEnd: '5%'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.valueStyle}>
            {value}{' '}
            <Text style={styles.outOf}>
              {' '}
              / {target} {targetUnit}
            </Text>
          </Text>
        </View>
        {small ? (
          <ProgressBar
            progress={percentage}
            useIndicatorLevel={true}
            reverse={false}
            containerStyle={styles.progressContainer}
          />
        ) : (
          <ProgressBar
            progress={percentage}
            useIndicatorLevel={true}
            reverse={true}
            containerStyle={styles.progressContainerLarge}
          />
        )}
        <Text style={styles.header}>{details}</Text>
      </View>
      <View style={{flex: 1}} />
      {clickable === true && (
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => chevronDownMethod(!clickable)}>
          <EvilIcons name="chevron-down" size={50} />
        </TouchableOpacity>
      )}
      {clickable === false && (
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => chevronDownMethod(!clickable)}>
          <EvilIcons name="chevron-up" size={50} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProgressContent;

const styles = StyleSheet.create({
  progressContainer: {
    borderRadius: 9.5,
    height: 7,
  },
  progressContainerLarge: {
    borderRadius: 9.5,
    width: 250,
    height: 7,
  },
  header: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 18,
    margin: '1%',
  },
  outOf: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 16,
    margin: '1%',
  },
  valueStyle: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 19,
    margin: '1%',
  },
  chevron: {
    alignSelf: 'flex-end',
  },
});

//comment
