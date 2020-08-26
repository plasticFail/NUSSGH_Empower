import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
//component
import Counter from '../../../components/onboarding/medication/Counter';
import SelectDaysModal from '../../../components/onboarding/medication/selectDaysModal';

Ionicons.loadFont();

const AddPlan = (props) => {
  const [dosage, setDosage] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [selectedDates41, setSelectedDates41] = useState({});
  const [selectedString, setSelectedString] = useState('');
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState({
    drugName: 'ACTRAPID [Insulin Soluble] Injection',
    image_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Actrapid_vial.jpg/1200px-Actrapid_vial.jpg',
    unit: 'unit',
  });

  useEffect(() => {
    formatSelectionString();
  }, [selectedDates41]);

  const goPrevScreen = () => {
    props.navigation.goBack();
  };

  //pass selected dates with the medications back
  const handleAdd = () => {
    props.navigation.navigate('MedicationPlan', {list: selectedDates41});
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
    if (selections.length > 42) {
      let reducedString = selections.slice(0, 42) + '...';
      setSelectedString(reducedString);
    } else {
      setSelectedString(selections);
    }
  };

  return (
    <View style={styles.addPlanContainer}>
      <TouchableOpacity onPress={goPrevScreen}>
        <Ionicons
          name={'arrow-back'}
          size={40}
          color={'#aad326'}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.stepDetailText}>Add Medicine Plan</Text>
      <Text style={{fontSize: 18}}>Select your medicine</Text>
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
      <Text style={styles.fieldText}>Recurring Period</Text>
      <TouchableOpacity style={styles.selectDaysButton} onPress={openModal}>
        {isEmpty(selectedDates41) === true ? (
          <Text style={styles.selectDaysText}>Select Days</Text>
        ) : (
          <Text style={styles.selectDaysText}>{selectedString}</Text>
        )}
      </TouchableOpacity>
      {/* Day Selection Modal Component*/}
      <SelectDaysModal
        visible={dayModalVisible}
        closeModal={closeModal}
        selectedDates41={selectedDates41}
        setSelectedDates41={setSelectedDates41}
        selectedMedicine={selectedMedicine}
      />
      <View style={{flex: 7}} />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
      <View style={{flex: 1}} />
    </View>
  );
};

export default AddPlan;

const styles = StyleSheet.create({
  addPlanContainer: {
    flex: 1,
    width: '100%',
    padding: '3%',
    backgroundColor: 'white',
  },
  backIcon: {
    marginTop: '5%',
  },
  stepDetailText: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: '3%',
  },
  fieldText: {
    fontSize: 20,
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
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '2%',
    paddingStart: '2%',
    paddingEnd: '2%',
  },
  addButton: {
    backgroundColor: '#aad326',
    height: 45,
    width: '70%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  addText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
});
