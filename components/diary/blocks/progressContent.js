import React, {useEffect} from 'react';
import {Animated, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
//component
import ProgressBar from '../../progressbar';
//style
import {Colors} from '../../../styles/colors';
//third party lib
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ProgressContent = (props) => {
  const {
    header,
    value,
    target,
    flip,
    details,
    targetUnit,
    clickable,
    small,
  } = props;
  const {chevronDownMethod} = props;
  const percentage = Math.floor((Number(value) / Number(target)) * 100) + '%';
  return !flip ? (
    <View style={{marginEnd: '5%', flexBasis: '29%'}}>
      <Text style={styles.header}>{header}</Text>
      <ProgressBar
        progress={percentage}
        useIndicatorLevel={true}
        reverse={true}
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
            reverse={true}
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
    width: '100%',
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
