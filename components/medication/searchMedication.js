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
//function
import {storeMedications} from '../../netcalls/requestsLog';
//component
import SearchResult from './searchResult';
//style
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

Ionicons.loadFont();

const SearchMedication = (props) => {
  const {visible, closeModal, parent, recordDate} = props;
  const {selectedMedicine, setSelectedMedicine} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyCache, setSearchKeyCache] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //time lag when call api*
  useEffect(() => {
    console.log('search key ' + searchTerm + ' cache ' + searchKeyCache);
    let mounted = true;
    if (searchKeyCache == searchTerm) {
      if (mounted) {
        console.log('searching from med database');
        setTimeout(() => searchMedication(), 800);
      }
      return function cleanUp() {
        mounted = false;
        clearTimeout();
      };
    }
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
          <SearchResult
            medicationList={searchResults}
            selectedMedicine={selectedMedicine}
            setSelectedMedicine={setSelectedMedicine}
            closeModal={closeModal}
          />
        </View>
      ) : searchTerm === '' ? (
        <>
          <Text style={styles.prompt}>
            Input the medication you want to add in the search bar!
          </Text>
          <View style={{flex: 1}} />
        </>
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
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 20,
    borderRadius: 9.5,
    borderWidth: 1,
    borderColor: '#e2e8ee',
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    color: '#424242',
    fontSize: 20,
    borderRadius: 9.5,
  },
  prompt: {
    alignSelf: 'center',
    marginTop: '50%',
    fontSize: 20,
    width: '90%',
    textAlign: 'center',
  },
});

//comment
