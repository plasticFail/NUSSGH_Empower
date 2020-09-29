import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
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

const MedicationGoal = (props) => {
  const {visible} = props;
  const {close} = props;

  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [opened, setOpened] = useState(false);
  const [frequency, setFrequency] = useState({name: 'Daily', value: 'daily'});
  const [selectedMed, setSelectedMed] = useState({});
  const [dosage, setDosage] = useState(0);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  useEffect(() => {
    showSubmitBtn();
  }, [goalName, selectedMed, dosage, opened]);

  const submit = () => {
    let obj = {
      goalName: goalName,
      startDate: Moment(startDate).format('DD/MM/YYYY HH:mm:ss'),
      endDate: Moment(endDate).format('DD/MM/YYYY HH:mm:ss'),
      frequency: frequency.value,
      medication: selectedMed.drugName,
      dosage: dosage,
    };
    console.log(obj);
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
        <Text style={globalStyles.pageHeader}>Add Goal</Text>
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

export default MedicationGoal;

const styles = StyleSheet.create({
  spacing: {
    marginStart: '4%',
    marginEnd: '4%',
  },
});
