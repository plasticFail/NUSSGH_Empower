import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Moment from 'moment';
//styles
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import NameDateSelector from './nameDateSelector';
import FrequencySelector from './frequencySelector';
//styles
import logStyles from '../../styles/logStyles';
//function
import {checkBloodGlucoseText} from '../../commonFunctions/logFunctions';

const min_key = 'min';
const max_key = 'max';

const BgGoal = (props) => {
  const {visible} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //change select date to date option *
  const [opened, setOpened] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [minBg, setMinBg] = useState('');
  const [maxBg, setMaxBg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    check();
    showSubmitBtn();
  }, [minBg, maxBg, goalName]);

  const submit = () => {
    let obj = {
      goalName: goalName,
      startDate: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      endDate: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency,
      minBg: minBg,
      maxBg: maxBg,
    };
  };

  const showSubmitBtn = () => {
    if (
      maxBg != '' &&
      minBg != '' &&
      checkBloodGlucoseText(maxBg) === '' &&
      checkBloodGlucoseText(minBg) === '' &&
      opened &&
      goalName.length != 0 &&
      errorMsg === ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  const setFunction = (type, value) => {
    if (type === min_key) {
      setMinBg(value);
    }
    if (type === max_key) {
      setMaxBg(value);
    }
  };

  const check = () => {
    if (minBg != '' && maxBg != '') {
      let max = Number(maxBg);
      let min = Number(minBg);
      if (max < min) {
        setErrorMsg(
          'Min blood glucose should be lesser than max blood glucose and vice versa',
        );
        return;
      }
      if (max === min) {
        setErrorMsg(
          'Min blood glucose should not be equal to maximum blood glucose',
        );
        return;
      }
    }
    setErrorMsg('');
    return;
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => close()}
      onBackButtonPress={() => close()}
      backdropOpacity={1}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => close()} />
        </View>
        <Text style={globalStyles.pageHeader}>Add Goal</Text>
        <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
          Blood Glucose Goal
        </Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <NameDateSelector
            goalName={goalName}
            setGoalName={setGoalName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            opened={opened}
            setOpened={setOpened}
          />
          <FrequencySelector selected={frequency} setSelected={setFrequency} />
          {BgValue(minBg, setFunction, min_key)}
          {BgValue(maxBg, setFunction, max_key)}
          <Text style={[globalStyles.alertText, styles.spacing]}>
            {errorMsg}
          </Text>
          {checkBloodGlucoseText(minBg) != '' && (
            <Text style={[globalStyles.alertText, styles.spacing]}>
              Min Reading: {checkBloodGlucoseText(minBg)}
            </Text>
          )}
          {checkBloodGlucoseText(maxBg) != '' && (
            <Text style={[globalStyles.alertText, styles.spacing]}>
              Max Reading: {checkBloodGlucoseText(maxBg)}
            </Text>
          )}
        </ScrollView>
        <View style={[globalStyles.buttonContainer]}>
          {showSubmitBtn() === false ? (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BgGoal;

function BgValue(value, setFunction, type) {
  return (
    <View style={{flexDirection: 'row'}}>
      {type === min_key ? (
        <Text
          style={[
            logStyles.fieldName,
            {color: Colors.lastLogValueColor, marginStart: '4%', flex: 1},
          ]}>
          Min Reading (mmol/L)
        </Text>
      ) : (
        <Text
          style={[
            logStyles.fieldName,
            {color: Colors.lastLogValueColor, marginStart: '4%', flex: 1},
          ]}>
          Max Reading (mmol/L)
        </Text>
      )}

      <TextInput
        style={[logStyles.inputField, {marginEnd: '4%', width: '20%'}]}
        placeholderTextColor="#a1a3a0"
        keyboardType="decimal-pad"
        value={value}
        onChangeText={(input) => setFunction(type, input)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
