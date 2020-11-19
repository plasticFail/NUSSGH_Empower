import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
//funtcion
import {getSelectedCount} from '../../../commonFunctions/medicationFunction';
import PeriodModal from './periodModal';
import {normalTextFontSize} from '../../../styles/variables';
import {adjustSize} from '../../../commonFunctions/autoResizeFuncs';

const SelectPeriod = (props) => {
  const {openPeriodModal, daysArr, setDaysArr} = props;
  const {setOpenPeriodModal} = props;

  return (
    <>
      <TouchableOpacity
        style={styles.selectPeriodButton}
        onPress={() => setOpenPeriodModal(true)}>
        {getSelectedCount(daysArr) === 0 ? (
          <Text style={styles.selectPeriodText}>Select Period</Text>
        ) : getSelectedCount(daysArr) === 7 ? (
          <Text style={[styles.chosenPeriodText, {marginVertical: '2%'}]}>
            Daily
          </Text>
        ) : (
          <Text
            editable={false}
            style={[
              styles.chosenPeriodText,
              {height: '120%', marginVertical: 0},
            ]}>
            Weekly{'\n'}
            {daysArr.map(
              (item, index) =>
                item.selected === true && (
                  <Text key={index} style={styles.weeklyDayText}>
                    {String(item.name).substr(0, 3)}{' '}
                  </Text>
                ),
            )}
          </Text>
        )}
      </TouchableOpacity>
      <PeriodModal
        visible={openPeriodModal}
        closeModal={() => setOpenPeriodModal(false)}
        daysArr={daysArr}
        setDaysArr={setDaysArr}
      />
    </>
  );
};

export default SelectPeriod;

const styles = StyleSheet.create({
  selectPeriodButton: {
    backgroundColor: 'white',
    height: adjustSize(45),
    width: '90%',
    borderRadius: adjustSize(15),
    borderWidth: 2,
    borderColor: '#e2e8ee',
    alignSelf: 'center',
    marginStart: '5%',
    marginEnd: '5%',
  },
  selectPeriodText: {
    fontSize: normalTextFontSize,
    textAlign: 'center',
    marginVertical: '2%',
  },
  chosenPeriodText: {
    fontSize: normalTextFontSize,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weeklyDayText: {
    fontSize: adjustSize(14),
    fontWeight: 'normal',
  },
});
