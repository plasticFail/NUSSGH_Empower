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
import {storeMedications} from '../logRequestFunctions';

import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

Entypo.loadFont();

export default class SelectMedicationModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedMedicineName: '',
      searchMedicineResults: [],
      dosage: '',
      loading: false,
      noResult: false,
    };
    this.timeout = setTimeout(() => {}, 0);
    this.searchMedication = this.searchMedication.bind(this);
    this.callMedicationAPI = this.callMedicationAPI.bind(this);
    this.selectFromList = this.selectFromList.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setResults = this.setResults.bind(this);
    this.setDosage = this.setDosage.bind(this);
    this.submit = this.submit.bind(this);
    this.checkRepeat = this.checkRepeat.bind(this);
  }

  searchMedication(searchKey) {
    if (searchKey === '') {
      clearTimeout(this.timeout);
      this.setState({loading: false});
      this.setState({searchMedicineResults: []});
    } else {
      this.setState({loading: true});
      //set for 1 second
      setTimeout(() => {
        this.setState({loading: false});
        //data
        this.callMedicationAPI(searchKey);
      }, 500);
    }
  }

  callMedicationAPI(searchKey) {
    if (AsyncStorage.getItem('medications') == null) {
      storeMedications();
    } else {
      getMedications();
      let arr = [];
      AsyncStorage.getItem('medications').then((response) => {
        for (var x of JSON.parse(response)) {
          arr.push(x);
        }
        var result = arr.filter((medication) =>
          medication.toLowerCase().includes(searchKey.toLowerCase()),
        );
        this.setState({searchMedicineResults: result});
      });
    }
  }

  setQuery() {
    this.setState({query: ''});
  }

  setResults() {
    this.setState({searchMedicineResults: []});
  }

  selectFromList(item) {
    console.log('Selected Item: ' + item);
    this.setState({query: item});
    this.setState({selectedMedicineName: item});
    this.setState({searchMedicineResults: []});
  }

  setDosage(dosage) {
    console.log('Setting dosage: ' + dosage);
    this.setState({dosage: dosage});
  }

  submit() {
    if (
      this.state.selectedMedicineName.length != 0 &&
      this.state.dosage.length != 0
    ) {
      var check = this.checkRepeat(this.state.selectedMedicineName);
      //if repeated
      if (check) {
        console.log('Duplicate detected');
        Alert.alert('Error', 'Medication added previously', [{text: 'Got It'}]);
      } else {
        console.log(
          'Adding Medicine: ' +
            this.state.selectedMedicineName +
            ' Dosage: ' +
            this.state.dosage,
        );
        //use to send the selected medicine back to 'parent'
        this.props.setMedicine({
          name: this.state.selectedMedicineName,
          dosage: this.state.dosage,
        });
      }
    } else {
      Alert.alert('Invalid', 'Please make sure all fields are filled', [
        {text: 'Got It'},
      ]);
    }
  }

  checkRepeat(medicationName) {
    var arr = this.props.selectedMedicationList;
    for (var x of arr) {
      if (x.name == medicationName) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {query, loading, searchMedicineResults} = this.state;
    return (
      <View style={styles.container}>
        <SearchMedicine
          searchMedication={this.searchMedication}
          query={query}
          setQuery={this.setQuery}
          setMedication={this.setMedication}
          setResults={this.setResults}
        />
        {searchMedicineResults.length > 0 && (
          <SearchMedicineResults
            searchMedicineResults={searchMedicineResults}
            selectFromList={this.selectFromList}
          />
        )}
        {loading && <ActivityIndicator animating={loading} />}

        <DosageInput setDosage={this.setDosage} />

        <View style={{paddingBottom: '4%'}}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              {width: 200, height: 40, backgroundColor: '#aad326'},
            ]}
            onPress={this.submit}>
            <Text style={[styles.buttonText, {fontSize: 22}]}>
              Add Medicine
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
                uri:
                  'https://assets.nst.com.my/images/articles/ondontmiss1_1589162412.jpg',
              }}
            />
            <Text style={{flex: 3, flexWrap: 'wrap'}}>{item}</Text>
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

function SearchMedicine({searchMedication, query, setQuery, setResults}) {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Name:</Text>
      {query.length != 0 ? (
        <TextInput
          style={styles.searchInputBox}
          value={query}
          placeholderTextColor="#a1a3a0"
          onChangeText={(text) => {
            setQuery();
            setResults();
            searchMedication(text);
          }}
        />
      ) : (
        <TextInput
          style={styles.searchInputBox}
          placeholder="Type a medication..."
          placeholderTextColor="#a1a3a0"
          onChangeText={(text) => {
            searchMedication(text.trim());
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
    width: 40,
    height: 40,
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
