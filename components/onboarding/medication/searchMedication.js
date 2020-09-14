import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
//function
import {
  storeMedications,
  getMedication4Day,
} from '../../../netcalls/requestsLog';
import {med_key} from '../../../commonFunctions/logFunctions';
//component
import SearchResult from './searchResult';
import SearchResult2 from '../../logs/medication/searchResult_2';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

Ionicons.loadFont();

const SearchMedication = (props) => {
  const {visible, closeModal, parent} = props;
  const {selectedMedicine, setSelectedMedicine} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyCache, setSearchKeyCache] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (parent === med_key) {
      getMedication2day();
    }
  }, []);

  //time lag when call api*
  useEffect(() => {
    console.log('search key ' + searchTerm + ' cache ' + searchKeyCache);
    let mounted = true;
    if (searchKeyCache == searchTerm) {
      if (mounted && parent === 'plan') {
        console.log('searching from med database');
        setTimeout(() => searchMedication(), 800);
      } else if (mounted && parent === med_key) {
        console.log('searching from medication plan');
        setTimeout(() => getMedication2day(), 800);
      }
    }
    return function cleanUp() {
      mounted = false;
      clearTimeout();
    };
  }, [searchTerm, searchKeyCache]);

  //update states
  const search = (query) => {
    if (query === '') {
      setIsLoading(false);
      setSearchResult([]);
      setSearchTerm('');
      setSearchKeyCache('');
    } else {
      setIsLoading(true);
      setSearchTerm(query);
      setTimeout(() => {
        setSearchKeyCache(query);
      }, 1000);
    }
  };

  //get the list of medication for today
  const getMedication2day = () => {
    const today = Moment(new Date()).format('YYYY-MM-DD');
    getMedication4Day(today).then((response) => {
      let d = response[today];
      let arr = [];
      for (var x of d) {
        arr.push(x);
      }
      if (searchTerm != '') {
        let result = arr.filter((medication) => {
          let medicine = medication.medication
            .replace(/\s{1,2}\[|\]/g, ' ')
            .toLowerCase();
          let searchArr = String(searchTerm).split(' ');
          let count = 0;
          for (let x of searchArr) {
            if (medicine.includes(x.toLowerCase())) {
              count += 1;
            }
          }
          if (count === searchArr.length) {
            return medication;
          }
        });
        setSearchResult(result);
        setIsLoading(false);
      } else {
        setSearchResult(arr);
        setIsLoading(false);
      }
    });
  };

  //make api call
  const searchMedication = () => {
    if (searchTerm != '') {
      let arr = [];
      storeMedications().then((response) => {
        for (let x of response.medications) {
          arr.push(x);
        }
        let result = arr.filter((medication) => {
          let medicine = medication.drug_name
            .replace(/\s{1,2}\[|\]/g, ' ')
            .toLowerCase();
          let searchArr = String(searchTerm).split(' ');
          let count = 0;
          for (let x of searchArr) {
            if (medicine.includes(x.toLowerCase())) {
              count += 1;
            }
          }
          if (count === searchArr.length) {
            return medication;
          }
        });
        setSearchResult(result);
        setIsLoading(false);
      });
    } else {
      setSearchResult([]);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      backdropColor={Colors.backgroundColor}>
      <Text
        style={[globalStyles.pageHeader, {marginTop: '5%', marginStart: '2%'}]}>
        Search
      </Text>
      <View style={{flexDirection: 'row', marginTop: '2%'}}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={30}
            color="#000"
            style={{padding: '1%'}}
          />
          <TextInput
            onChangeText={(value) => search(value)}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#B3D14C"
            style={{justifyContent: 'center', marginTop: '50%'}}
          />
          <View style={{flex: 1}} />
        </>
      ) : searchResults.length > 0 ? (
        <View style={{flex: 1, marginTop: '2%'}}>
          {parent === med_key ? (
            <SearchResult2
              medicationList={searchResults}
              selectedMedicine={selectedMedicine}
              setSelectedMedicine={setSelectedMedicine}
              closeModal={closeModal}
            />
          ) : (
            <SearchResult
              medicationList={searchResults}
              selectedMedicine={selectedMedicine}
              setSelectedMedicine={setSelectedMedicine}
              closeModal={closeModal}
            />
          )}
        </View>
      ) : searchTerm === '' ? (
        parent === med_key ? (
          <>
            <Text style={styles.prompt}>
              You have no set medications. Please add to your medication plan
              before making a medication log.
            </Text>
            <View style={{flex: 1}} />
          </>
        ) : (
          <>
            <Text style={styles.prompt}>
              Input the medication you want to add for the day in the search
              bar!
            </Text>
            <View style={{flex: 1}} />
          </>
        )
      ) : (
        <>
          <Text style={styles.prompt}>No results for {searchTerm}</Text>
          <View style={{flex: 1}} />
        </>
      )}
    </Modal>
  );
};

export default SearchMedication;

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  cancelText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    color: '#aad326',
    marginTop: '10%',
    marginStart: '3%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ebed',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#e2e8ee',
    color: '#424242',
    backgroundColor: '#e6ebed',
    fontSize: 20,
    borderRadius: 20,
  },
  prompt: {
    alignSelf: 'center',
    marginTop: '50%',
    fontSize: 20,
    width: '90%',
    textAlign: 'center',
  },
});
