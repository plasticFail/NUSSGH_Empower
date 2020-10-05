import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../styles/colors';
import logStyles from '../../styles/logStyles';
import globalStyles from '../../styles/globalStyles';
import {horizontalMargins} from '../../styles/variables';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import {
  periodList,
  dow,
  dayList,
  daily,
} from '../../commonFunctions/medicationFunction';

import CHEVRON_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';

const PeriodModal = (props) => {
  const {visible, days, setDays} = props;
  const {closeModal} = props;
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const choosePeriod = (item) => {
    if (item === daily) {
      let arr = [];
      dayList.map((item) => {
        item.selected = true; //chosen
        arr.push(item);
      });
      setDays(arr);
      closeModal();
    } else {
      //opacity show dow
      setSelectedPeriod(dow);
    }
  };

  const reverseContent = () => {
    if (selectedPeriod.length === 0) {
      closeModal();
    } else {
      setSelectedPeriod('');
    }
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => reverseContent()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={logStyles.modalContainer}>
        <View style={logStyles.menuBarContainer}>
          <LeftArrowBtn close={reverseContent} />
          <View style={{flex: 1}} />
        </View>
        <Text
          style={[globalStyles.pageHeader, {marginStart: horizontalMargins}]}>
          Recurring Period
        </Text>
        {selectedPeriod.length == 0 ? (
          <>
            <Text style={globalStyles.pageSubDetails}>
              Select the recurring periods for this medication below:{' '}
            </Text>
            {periodList.map((item, index) => (
              <TouchableOpacity
                key={item}
                style={styles.periodOption}
                onPress={() => choosePeriod(item)}>
                <Text style={globalStyles.pageSubDetails}>{item}</Text>
                {item === dow && <CHEVRON_RIGHT />}
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text style={globalStyles.pageDetails}>Days of the Week</Text>
            <Text style={globalStyles.pageSubDetails}>
              Select the days of the week you would like this medication to
              recur below
            </Text>
          </>
        )}
      </View>
    </Modal>
  );
};
export default PeriodModal;

const styles = StyleSheet.create({
  periodOption: {
    marginTop: '2%',
    padding: '2%',
    borderBottomColor: '#e2e8ee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
