import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
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
      selectedMedicine: '',
      searchMedicineResults: [],
      loading: false,
    };
    this.timeout = setTimeout(() => {}, 0);
    this.props.setMedicine('hi2'); //use to send the selected medicine back
    this.searchMedication = this.searchMedication.bind(this);
    this.callMedicationAPI = this.callMedicationAPI.bind(this);
  }

  searchMedication(searchKey) {
    if (searchKey === '') {
      clearTimeout(this.timeout);
      this.setState({loading: false});
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
        console.log(arr.length);
        console.log(result.length);
      });
    }
  }

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <SearchMedicine searchMedication={this.searchMedication} />
        <ActivityIndicator animating={loading} />
      </View>
    );
  }
}

function SearchMedicineResults() {}

function SearchMedicine({searchMedication}) {
  return (
    <View style={{marginTop: '7%', padding: '5%'}}>
      <Text style={styles.inputHeader}>Name:</Text>
      <TextInput
        style={[styles.inputBox, {width: 300}]}
        placeholder=""
        placeholderTextColor="#a1a3a0"
        onChangeText={(text) => searchMedication(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,
  },
});
