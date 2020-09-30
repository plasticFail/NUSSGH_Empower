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
import {
  maxCarbs,
  maxFats,
  maxProtein,
  getDateObj,
} from '../../../commonFunctions/diaryFunctions';
import {addFoodGoalReq} from '../../../netcalls/requestsGoals';
import {getFrequency} from '../../../commonFunctions/goalFunctions';

const initialCal = 1000;
const initialCarbs = maxCarbs / 2;
const initialFat = maxFats / 2;
const initialProtein = maxProtein / 2;

const FoodGoal = (props) => {
  const {visible, parent, food} = props;
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
  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && food != undefined) {
      setOpened(true);
      setGoalName(food.name);
      setStartDate(getDateObj(food.start_date));
      setEndDate(getDateObj(food.end_date));
      setFrequency(getFrequency(food.frequency));
      setCal(food.calories);
      setCarbs(food.carbs);
      setProtein(food.protein);
      setFats(food.fats);
      setPageText('Edit Goal');
    }
  }, []);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName]);

  const submit = async () => {
    let obj = {
      name: goalName,
      start_date: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      end_date: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency.value,
      calories: cal,
      carbs: carbs,
      protein: protein,
      fats: fats,
    };
    if (await addFoodGoalReq(obj)) {
      Alert.alert('Food goal created successfully', '', [
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
        <Text style={globalStyles.pageHeader}>{pageText}</Text>
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

export default FoodGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
