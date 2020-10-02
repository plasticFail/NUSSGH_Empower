import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
import RenderCounter from '../renderCounter';
//function
import {
  maxCarbs,
  maxFats,
  maxProtein,
} from '../../../commonFunctions/diaryFunctions';
import {addFoodGoalReq} from '../../../netcalls/requestsGoals';

const initialCal = 1000;
const initialCarbs = maxCarbs / 2;
const initialFat = maxFats / 2;
const initialProtein = maxProtein / 2;

const FoodGoal = (props) => {
  const {visible, parent, food} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [cal, setCal] = useState(initialCal);
  const [carbs, setCarbs] = useState(initialCarbs);
  const [fats, setFats] = useState(initialFat);
  const [protein, setProtein] = useState(initialProtein);
  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && food != undefined) {
      setGoalName(food.name);
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
      calories: cal,
      carbs: carbs,
      protein: protein,
      fats: fats,
    };
    if (parent != undefined) {
      if (await addFoodGoalReq(obj, food._id)) {
        Alert.alert('Food goal edited successfully', '', [
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
    }
  };

  const showSubmitBtn = () => {
    if (
      goalName.length > 0 &&
      protein != 0 &&
      carbs != 0 &&
      cal != 0 &&
      fats != 0
    ) {
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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <NameDateSelector goalName={goalName} setGoalName={setGoalName} />
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
          </View>
        </KeyboardAvoidingView>
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
