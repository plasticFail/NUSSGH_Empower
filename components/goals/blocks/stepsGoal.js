import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Moment from 'moment';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
import FrequencySelector from '../dropDownSelector';
import RenderCounter from '../renderCounter';
//function
import {maxSteps, getDateObj} from '../../../commonFunctions/diaryFunctions';
import {addStepsGoalReq} from '../../../netcalls/requestsGoals';
import {getFrequency} from '../../../commonFunctions/goalFunctions';

const StepsGoal = (props) => {
  const {visible, parent, step} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //change select date to date option *
  const [opened, setOpened] = useState(false);
  const [frequency, setFrequency] = useState({name: 'Daily', value: 'daily'});

  const [steps, setSteps] = useState(maxSteps);

  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && step != undefined) {
      setOpened(true);
      setGoalName(step.name);
      setStartDate(getDateObj(step.start_date));
      setEndDate(getDateObj(step.end_date));
      setFrequency(getFrequency(step.frequency));
      setSteps(step.steps);
      setPageText('Edit Goal');
    }
  }, []);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName]);

  const submit = () => {
    let obj = {
      name: goalName,
      start_date: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      end_date: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency.value,
      steps: steps,
    };
    if (parent != undefined) {
      if (addStepsGoalReq(obj, step._id)) {
        Alert.alert('Step goal edited successfully', '', [
          {
            text: 'Got It',
            onPress: () => close(),
          },
        ]);
      } else {
        Alert.alert('Unexpected Error Occured', 'Please try again later!', [
          {
            text: 'Got It',
          },
        ]);
      }
    } else {
      if (addStepsGoalReq(obj)) {
        Alert.alert('Step goal created successfully', '', [
          {
            text: 'Got It',
            onPress: () => close(),
          },
        ]);
      } else {
        Alert.alert('Unexpected Error Occured', 'Please try again later!', [
          {
            text: 'Got It',
          },
        ]);
      }
    }
  };

  const showSubmitBtn = () => {
    if (opened && goalName.length > 0) {
      return true;
    }
    return false;
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
        <Text style={globalStyles.pageHeader}>{pageText}</Text>
        <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
          Steps Goal
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
          <FrequencySelector
            selected={frequency}
            setSelected={setFrequency}
            fieldName="Frequency"
            dropDownType="frequency"
          />
          <RenderCounter
            fieldName="Min Steps"
            item={steps}
            setItem={setSteps}
            parameter={''}
          />
        </ScrollView>
        <View style={[globalStyles.buttonContainer]}>
          {showSubmitBtn() === false ? (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>{pageText}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>{pageText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StepsGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
