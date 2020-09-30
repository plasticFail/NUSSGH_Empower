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
import {getDateObj} from '../../../commonFunctions/diaryFunctions';
import {getFrequency} from '../../../commonFunctions/goalFunctions';

const MedicationGoal = (props) => {
  const {visible, parent, med} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [opened, setOpened] = useState(false);
  const [frequency, setFrequency] = useState({name: 'Daily', value: 'daily'});
  const [selectedMed, setSelectedMed] = useState({});
  const [dosage, setDosage] = useState(0);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [pageText, setPageText] = useState('Add Goal');

  useEffect(() => {
    if (parent != undefined && med != undefined) {
      setOpened(true);
      setGoalName(med.name);
      setStartDate(getDateObj(med.start_date));
      setEndDate(getDateObj(med.end_date));
      setFrequency(getFrequency(med.frequency));
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
  }, [goalName, selectedMed, dosage, opened]);

  const submit = async () => {
    let obj = {
      name: goalName,
      start_date: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      end_date: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency.value,
      medication: selectedMed.drugName,
      dosage: dosage,
    };
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
  };

  const showSubmitBtn = () => {
    if (opened && goalName.length > 0 && dosage > 0 && !isEmpty(selectedMed)) {
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
