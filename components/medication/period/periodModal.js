import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../../styles/colors';
import logStyles from '../../../styles/logStyles';
import globalStyles from '../../../styles/globalStyles';
import {horizontalMargins} from '../../../styles/variables';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import {
  periodList,
  dow,
  daily,
} from '../../../commonFunctions/medicationFunction';

import CHEVRON_RIGHT from '../../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';

const PeriodModal = (props) => {
  const {visible, daysArr, setDaysArr} = props;
  const {closeModal} = props;
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimDOW = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedPeriod === dow) {
      Animated.timing(fadeAnimDOW, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedPeriod, visible]);

  const choosePeriod = (item) => {
    if (item === daily) {
      let arr = [];
      for (var x of daysArr) {
        x.selected = true;
        arr.push(x);
      }
      setDaysArr(arr);
      closeModal();
    } else {
      //opacity animation show dow
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

  const addDay = (addDay) => {
    //see if added day exist alr
    let arr = [];
    for (var x of daysArr) {
      if (x?.name === addDay.name) {
        if (x?.selected) {
          x.selected = false;
        } else {
          x.selected = true;
        }
      }
      arr.push(x);
    }
    setDaysArr(arr);
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
          <Animated.View style={{opacity: fadeAnim}}>
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
          </Animated.View>
        ) : (
          <Animated.View style={{opacity: fadeAnimDOW}}>
            <Text style={globalStyles.pageDetails}>Days of the Week</Text>
            <Text style={globalStyles.pageSubDetails}>
              Select the days of the week you would like this medication to
              recur below:
            </Text>
            <FlatList
              data={daysArr}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) =>
                item.selected ? (
                  <TouchableOpacity
                    style={[styles.dayButton, {backgroundColor: '#aad326'}]}
                    onPress={() => addDay(item)}>
                    <Text
                      style={[
                        globalStyles.pageSubDetails,
                        {textAlign: 'center'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.dayButton}
                    onPress={() => addDay(item)}>
                    <Text
                      style={[
                        globalStyles.pageSubDetails,
                        {textAlign: 'center'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )
              }
            />
          </Animated.View>
        )}
      </View>
      {selectedPeriod === dow && (
        <Animated.View
          style={[globalStyles.buttonContainer, {opacity: fadeAnimDOW}]}>
          <TouchableOpacity
            style={globalStyles.nextButtonStyle}
            onPress={() => closeModal()}>
            <Text style={globalStyles.actionButtonText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
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
  dayButton: {
    backgroundColor: '#e2e8ee',
    width: '40%',
    paddingVertical: '4%',
    borderRadius: 15,
    margin: '3%',
  },
});
