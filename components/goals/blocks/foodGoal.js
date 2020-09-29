import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  maxCarbs,
  maxFats,
  maxProtein,
} from '../../../commonFunctions/diaryFunctions';
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

const initialCal = 1000;
const initialCarbs = maxCarbs / 2;
const initialFat = maxFats / 2;
const initialProtein = maxProtein / 2;

const FoodGoal = (props) => {
  const {visible} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //change select date to date option *
  const [opened, setOpened] = useState(false);
  const [frequency, setFrequency] = useState({name: 'Daily', value: 'daily'});

  const [cal, setCal] = useState(initialCal);
  const [carbs, setCarbs] = useState(initialCarbs);
  const [fats, setFats] = useState(initialFat);
  const [protein, setProtein] = useState(initialProtein);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    showSubmitBtn();
  }, [goalName]);

  const submit = () => {
    let obj = {
      goalName: goalName,
      startDate: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      endDate: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency.value,
      cal: cal,
      carbs: carbs,
      protein: protein,
      fats: fats,
    };
    console.log(obj);
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
      backdropOpacity={1}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => close()} />
        </View>
        <Text style={globalStyles.pageHeader}>Add Goal</Text>
        <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
          Food Intake Goal
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
            fieldName="Cal"
            item={cal}
            setItem={setCal}
            parameter={'kCal'}
          />
          <RenderCounter
            fieldName="Carbs"
            item={carbs}
            setItem={setCarbs}
            parameter={'g'}
          />
          <RenderCounter
            fieldName="Fats"
            item={fats}
            setItem={setFats}
            parameter={'g'}
          />
          <RenderCounter
            fieldName="Protein"
            item={protein}
            setItem={setProtein}
            parameter={'g'}
          />
        </ScrollView>
        <View style={[globalStyles.buttonContainer]}>
          {showSubmitBtn() === false ? (
            <TouchableOpacity style={globalStyles.skipButtonStyle}>
              <Text style={globalStyles.actionButtonText}>Add Goal</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.submitButtonStyle}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>Add Goal</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FoodGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
