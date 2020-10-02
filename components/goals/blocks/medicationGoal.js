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
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import NameDateSelector from '../nameDateSelector';
import FrequencySelector from '../dropDownSelector';
import SearchMedication from '../../onboarding/medication/searchMedication';
import RenderCounter from '../renderCounter';
//function
import {isEmpty} from '../../../commonFunctions/common';
import {addMedGoalReq} from '../../../netcalls/requestsGoals';

const MedicationGoal = (props) => {
  const {visible, parent, med} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [selectedMed, setSelectedMed] = useState({});
  const [dosage, setDosage] = useState(0);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && med != undefined) {
      setGoalName(med.name);
      let medObj = {
        drugName: med.medication,
      };
      setDosage(med.dosage);
      setSelectedMed(medObj);
      setPageText('Edit Goal');
    }
  }, []);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName, selectedMed, dosage]);

  const submit = async () => {
    let obj = {
      name: goalName,
      frequency: frequency.value,
      medication: selectedMed.drugName,
      dosage: dosage,
    };
    if (parent != undefined) {
      if (await addMedGoalReq(obj, med._id)) {
        Alert.alert('Medication goal edited successfully', '', [
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
      if (await addMedGoalReq(obj)) {
        Alert.alert('Medication goal created successfully', '', [
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
    if (goalName.length > 0 && dosage > 0 && !isEmpty(selectedMed)) {
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
          Medication Goal
        </Text>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <NameDateSelector goalName={goalName} setGoalName={setGoalName} />
              <Text style={globalStyles.goalFieldName}>Medication</Text>
              <TouchableOpacity
                style={[logStyles.inputField, {margin: '4%'}]}
                onPress={() => setOpenSearchModal(true)}>
                {isEmpty(selectedMed) === true ? (
                  <Text style={{fontSize: 17, color: '#b5b5b5'}}>
                    <Ionicons name="search" size={20} /> Name (eg. Metformin)
                  </Text>
                ) : (
                  <Text style={{fontSize: 17, color: 'black'}}>
                    {selectedMed.drugName}
                  </Text>
                )}
              </TouchableOpacity>

              {/*Search Modal */}
              {openSearchModal ? (
                <SearchMedication
                  parent={'plan'}
                  visible={openSearchModal}
                  closeModal={() => setOpenSearchModal(false)}
                  selectedMedicine={selectedMed}
                  setSelectedMedicine={setSelectedMed}
                />
              ) : null}

              <RenderCounter
                fieldName={'Dosage'}
                item={dosage}
                setItem={setDosage}
                parameter={'Unit(s)'}
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

export default MedicationGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
