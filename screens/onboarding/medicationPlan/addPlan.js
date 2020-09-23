import React, {useState, useEffect, useDebugValue} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
//component
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import Counter from '../../../components/onboarding/medication/Counter';
import SelectDaysModal from '../../../components/onboarding/medication/selectDaysModal';
import SearchMedication from '../../../components/onboarding/medication/searchMedication';
//stlye
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import {
  horizontalMargins,
  onboard_marginStart,
  onboard_marginEnd,
  normalTextFontSize,
} from '../../../styles/variables';
import {addMed2Plan} from '../../../commonFunctions/medicationFunction';

Ionicons.loadFont();

const AddPlan = (props) => {
  const [dosage, setDosage] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [selectedDates41, setSelectedDates41] = useState({});
  const [selectedString, setSelectedString] = useState('');
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState({});
  const [selectedMedicineName, setSelectedMedicineName] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    formatSelectionString();
  }, [selectedDates41]);

  useEffect(() => {
    if (props.route.params != null) {
      const {fromAddPlanDate} = props.route.params;
      setSelectedDates41({
        [fromAddPlanDate]: {marked: true, medicine: {}, selected: true},
      });
    }
  }, []);

  //cut name shown
  useEffect(() => {
    if (!isEmpty(selectedMedicine)) {
      let name = selectedMedicine.drugName;
      if (name.length > 39) {
        let reducedString = name.slice(0, 39) + '...';
        setSelectedMedicineName(reducedString);
      } else {
        setSelectedMedicineName(name);
      }
    }
  }, [selectedMedicine]);

  //update dosage and per day
  useEffect(() => {
    setParameter();
    console.log(selectedMedicine);
  }, [dosage, frequency]);

  const goPrevScreen = () => {
    props.navigation.goBack();
  };

  //pass selected dates with the medications back
  const handleAdd = () => {
    if (
      dosage === 0 ||
      frequency === 0 ||
      isEmpty(selectedMedicine) ||
      isEmpty(selectedDates41)
    ) {
      Alert.alert('Invalid Input', 'Make sure all fields are filled', [
        {text: 'Got It'},
      ]);
    } else {
      setParameter();
      setMedicine2Obj();
      if (props.route.params != null) {
        if (props.route.params.fromParent === 'fromExistingPlan') {
          console.log('adding from existing plan ');

          Alert.alert('Medication Added', '', [
            {
              text: 'Got It',
              onPress: () => props.navigation.navigate('Medication'),
            },
          ]);
        } else {
          props.navigation.navigate('MedicationPlan', {
            list: selectedDates41,
            parent: 'addPlan',
          });
        }
      } else {
        //needed*
        props.navigation.navigate('MedicationPlan', {
          list: selectedDates41,
          parent: 'addPlan',
        });
      }
    }
  };

  //set dosage to medicine
  const setParameter = () => {
    if (!isEmpty(selectedMedicine)) {
      selectedMedicine['dosage'] = dosage;
      selectedMedicine['perDay'] = frequency;
    }
  };

  //set selected medicine to object
  const setMedicine2Obj = () => {
    for (var x of Object.keys(selectedDates41)) {
      if (isEmpty(selectedDates41[x].medicine)) {
        selectedDates41[x].medicine = selectedMedicine;
      }
    }
  };

  //check if selected dates object is empty
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  //handle select days modal
  const closeModal = () => {
    setDayModalVisible(false);
  };
  const openModal = () => {
    setDayModalVisible(true);
  };

  const openSearchModal = () => {
    setSearchVisible(true);
  };

  const closeSearchModal = () => {
    setSearchVisible(false);
  };

  //handle formating selection string
  const formatSelectionString = () => {
    let selections = '';
    let arr = Object.keys(selectedDates41);

    for (var i = 0; i < arr.length; i++) {
      let newDayString = moment(new Date(arr[i])).format('Do');
      if (i === arr.length - 1) {
        selections += newDayString;
      } else {
        selections += newDayString + ', ';
      }
    }
    if (selections.length > 38) {
      let reducedString = selections.slice(0, 35) + '...';
      setSelectedString(reducedString);
    } else {
      setSelectedString(selections);
    }
  };

  return (
    <View style={styles.addPlanContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={goPrevScreen} />
      </View>
      <Text style={[globalStyles.pageHeader, {marginStart: horizontalMargins}]}>
        Add Medicine Plan
      </Text>
      <TouchableOpacity style={styles.searchInput} onPress={openSearchModal}>
        {isEmpty(selectedMedicine) === true ? (
          <Text style={{fontSize: 17, color: '#b5b5b5'}}>
            <Ionicons name="search" size={20} /> Name (eg. Metformin)
          </Text>
        ) : (
          <Text style={{fontSize: 17, color: 'black'}}>
            {selectedMedicineName}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{paddingStart: '3%', paddingEnd: '3%'}}>
        <Counter
          count={dosage}
          setCount={setDosage}
          parameter={'Unit (s)'}
          fieldName={'Default Dosage'}
        />
        <Counter
          count={frequency}
          setCount={setFrequency}
          parameter={'Per Day'}
          fieldName={'Frequency'}
        />
        <Text style={[logStyles.fieldName, {marginBottom: '2%'}]}>
          Recurring Period
        </Text>
        <TouchableOpacity style={styles.selectDaysButton} onPress={openModal}>
          {isEmpty(selectedDates41) === true ? (
            <Text style={styles.selectDaysText}>Select Days</Text>
          ) : (
            <Text style={styles.selectDaysText}>{selectedString}</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Day Selection Modal Component*/}
      <SelectDaysModal
        visible={dayModalVisible}
        closeModal={closeModal}
        selectedDates41={selectedDates41}
        setSelectedDates41={setSelectedDates41}
        selectedMedicine={selectedMedicine}
      />
      <View style={{flex: 5}} />
      <View style={[globalStyles.buttonContainer]}>
        <TouchableOpacity
          style={globalStyles.nextButtonStyle}
          onPress={handleAdd}>
          <Text style={globalStyles.actionButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/*Search */}
      {searchVisible === true ? (
        <SearchMedication
          parent={'plan'}
          visible={searchVisible}
          closeModal={closeSearchModal}
          selectedMedicine={selectedMedicine}
          setSelectedMedicine={setSelectedMedicine}
        />
      ) : null}
    </View>
  );
};

export default AddPlan;

const styles = StyleSheet.create({
  addPlanContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  fieldText: {
    fontSize: normalTextFontSize,
    fontWeight: '700',
    marginVertical: '2%',
  },
  selectDaysButton: {
    backgroundColor: 'white',
    height: 45,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#aad326',
  },
  selectDaysText: {
    fontSize: normalTextFontSize,
    textAlign: 'center',
    marginVertical: '2%',
    paddingStart: onboard_marginStart,
    paddingEnd: onboard_marginEnd,
  },
  searchInput: {
    backgroundColor: '#e2e8ee',
    borderRadius: 9.5,
    marginBottom: '3%',
    marginTop: '2%',
    padding: '2%',
    marginStart: '3%',
    marginEnd: '3%',
  },
});
