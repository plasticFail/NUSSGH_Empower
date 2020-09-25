import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
//function
import {
  bg_key,
  food_key,
  med_key,
  weight_key,
  activity_key,
  step_key,
  renderLogIcon,
} from '../../commonFunctions/logFunctions';
//styles
import logStyles from '../../styles/logStyles';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import BgGoal from './bgGoal';
import FoodGoal from './foodGoal';
import MedicationGoal from './medicationGoal';

const AddGoalModal = (props) => {
  const {visible} = props;
  const {close} = props;
  const buttonList = [
    bg_key,
    food_key,
    med_key,
    weight_key,
    activity_key,
    step_key,
  ];
  const [openBg, setOpenBg] = useState(false);
  const [openFood, setOpenFood] = useState(false);
  const [openMed, setOpenMed] = useState(false);

  const trimPhrase = (phrase) => {
    if (String(phrase).includes('Log')) {
      return String(phrase).substr(0, phrase.length - 4);
    } else {
      return phrase;
    }
  };

  const openGoalType = (type) => {
    if (type === bg_key) {
      setOpenBg(true);
    }
    if (type === food_key) {
      setOpenFood(true);
    }
    if (type === med_key) {
      setOpenMed(true);
    }
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
        <Text style={[globalStyles.greyPageDetails, {marginBottom: '4%'}]}>
          Select Goal Type
        </Text>
        <FlatList
          data={buttonList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={logStyles.logItem}
              onPress={() => openGoalType(item)}>
              <Image source={renderLogIcon(item)} style={logStyles.loglogo} />
              <Text
                style={[
                  globalStyles.pageDetails,
                  {marginStart: '15%', flex: 1},
                ]}>
                {trimPhrase(item)} Goal
              </Text>
              <Icon
                name="chevron-right"
                size={20}
                color={Colors.lastLogValueColor}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Goal Type Modal to open */}
      {openBg ? (
        <BgGoal visible={openBg} close={() => setOpenBg(false)} />
      ) : null}
      {openFood ? (
        <FoodGoal visible={openFood} close={() => setOpenFood(false)} />
      ) : null}
      {openMed ? (
        <MedicationGoal visible={openMed} close={() => setOpenMed(false)} />
      ) : null}
    </Modal>
  );
};

export default AddGoalModal;
