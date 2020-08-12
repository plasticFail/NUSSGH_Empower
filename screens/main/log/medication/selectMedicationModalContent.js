import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {getMedications} from '../../../../storage/asyncStorageFunctions';
import {storeMedications} from '../../../../netcalls/requestsLog';

import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {checkDosage} from '../../../../commonFunctions/logFunctions';

Entypo.loadFont();

const SelectMedicationModalContent = (props) => {
  const [query, setQuery] = useState('');
  const [selectedMedicineName, setSelectedMedicineName] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [searchMedicationResults, setSearchMedicationResult] = useState([]);
  const [dosage, setDosage] = useState('');

  const searchMedication = (searchKey) => {
    if (searchKey === '') {
      //set seleted medication name : '
      setSearchMedicationResult([]);
    } else {
      //set for 1 second
      setTimeout(() => {
        //data
        returnSearchResult(searchKey);
      }, 500);
    }
  };

  //search
  const returnSearchResult = (searchKey) => {
    getMedications();
    let arr = [];
    AsyncStorage.getItem('medications').then((response) => {
      for (var x of JSON.parse(response)) {
        arr.push(x);
      }

      var result = arr.filter((medication) => {
        var medicine = medication.drug_name
          .replace(/\s{1,2}\[|\]/g, ' ')
          .toLowerCase();
        var searchArr = String(searchKey).split(' ');
        var count = 0;
        for (var x of searchArr) {
          if (medicine.includes(x.toLowerCase())) {
            count += 1;
          }
        }
        if (count == searchArr.length) {
          return medication;
        }
      });
      setSearchMedicationResult(result);
    });
  };

  const selectFromList = (item) => {
    console.log('Selected Item: ' + item);
    setQuery(item.drug_name);
    setSelectedMedicineName(item.drug_name);
    setSearchMedicationResult([]);
    setSelectedMedicine(item);
  };

  const submit = () => {
    if (checkDosage(dosage) && selectedMedicineName.length != 0) {
      //if repeated
      if (checkRepeat(selectedMedicine.drug_name)) {
        console.log('Duplicate detected');
        Alert.alert('Error', 'Medication added previously', [{text: 'Got It'}]);
      } else {
        console.log(
          'Adding Medicine: ' +
            selectedMedicine.drug_name +
            ' Dosage: ' +
            dosage,
        );
        //use to send the selected medicine back to 'parent'
        props.setMedicine({
          drugName: selectedMedicine.drug_name,
          unit: 'unit',
          dosage: Number(dosage),
          recordDate: '',
          image_url: selectedMedicine.image_url,
        });
        setQuery('');
      }
    }

    if (selectedMedicineName.length == 0) {
      Alert.alert('Error', 'Please select a medication from the database', [
        {text: 'Got It'},
      ]);
    }
  };

  const checkRepeat = (medicationName) => {
    var arr = props.selectedMedicationList;
    console.log('Checking');
    console.log(arr);
    for (var x of arr) {
      console.log(x.drug_name);
      if (x.drugName === medicationName) {
        return true;
      }
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <SearchMedicine
        searchMedication={searchMedication}
        query={query}
        setQuery={setQuery}
        setSelectedMedicineName={setSelectedMedicineName}
      />
      {searchMedicationResults.length > 0 && (
        <SearchMedicineResults
          searchMedicineResults={searchMedicationResults}
          selectFromList={selectFromList}
        />
      )}
      <DosageInput setDosage={setDosage} />

      <View style={{paddingBottom: '4%'}}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadow,
            {width: 200, height: 40, backgroundColor: '#aad326'},
          ]}
          onPress={submit}>
          <Text style={[styles.buttonText, {fontSize: 22}]}>Add Medicine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function DosageInput({setDosage}) {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Dosage: </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.inputBox, {flex: 1}]}
          placeholder=""
          placeholderTextColor="#a1a3a0"
          keyboardType="number-pad"
          onChangeText={(value) => setDosage(value)}
        />
        <View style={styles.unitStyle}>
          <Text style={{fontSize: 20}}>Unit (s)</Text>
        </View>
      </View>
    </View>
  );
}

function SearchMedicineResults({searchMedicineResults, selectFromList}) {
  return (
    <View
      style={[
        styles.resultItemContainer,
        {
          height: '38%',
          marginStart: '5%',
          marginEnd: '5%',
        },
      ]}>
      <Text style={{fontSize: 19, marginStart: '2%', marginBottom: '2%'}}>
        Results: {searchMedicineResults.length}
      </Text>
      <FlatList
        data={searchMedicineResults}
        renderItem={({item}) => (
          <View style={styles.resultItem}>
            <Image
              style={styles.medicineImg}
              source={{
                uri: item.image_url,
              }}
            />
            <Text style={{flex: 2, flexWrap: 'wrap'}}>{item.drug_name}</Text>
            <TouchableOpacity
              style={[styles.button, styles.shadow, {flex: 1}]}
              onPress={() => selectFromList(item)}>
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function SearchMedicine({
  searchMedication,
  query,
  setQuery,
  setSelectedMedicineName,
}) {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Name:</Text>
      {query.length != 0 ? (
        <TextInput
          style={styles.searchInputBox}
          value={query}
          placeholderTextColor="#a1a3a0"
          onChangeText={(text) => {
            setQuery('');
            setSelectedMedicineName('');
          }}
        />
      ) : (
        <TextInput
          style={styles.searchInputBox}
          placeholder="Type a medication..."
          placeholderTextColor="#a1a3a0"
          onChangeText={(text) => {
            searchMedication(text);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  componentContainer: {
    marginTop: '7%',
    padding: '5%',
  },
  header: {
    backgroundColor: '#aad326',
    padding: '4%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: '30%',
    marginTop: '2%',
  },
  inputHeader: {
    fontWeight: '500',
    fontSize: 20,
  },
  searchInputBox: {
    width: 340,
    height: 40,
    borderWidth: 1,
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,

    flexWrap: 'wrap',
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,
  },
  resultList: {
    width: 340,
    flexGrow: 0,
    marginStart: '3%',
    marginEnd: '4%',
  },
  resultItem: {
    borderBottomWidth: 1,
    borderColor: '#707070',
    padding: '3%',
    flexDirection: 'row',
    paddingStart: '2%',
  },
  resultItemContainer: {
    borderWidth: 1,
    borderColor: '#707070',
    padding: '3%',
    paddingStart: '2%',
  },
  medicineImg: {
    width: 98,
    height: 98,
    marginEnd: '3%',
  },
  button: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    width: 60,
    height: 30,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unitStyle: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#AAd326',
    padding: 15,
    alignItems: 'center',
  },
});

export default SelectMedicationModalContent;
